import {getFromStorage} from '../asyncStorage';
import {setInStorage} from '../asyncStorage/asyncStorage';
import {Goal} from './types';

export class GoalsApi {
  private _subscriptions: Map<string, Function[]>;
  private _goals: Map<string, Goal>;

  constructor() {
    this._subscriptions = new Map();
    this._goals = new Map();
  }

  public async getGoals() {
    if (this._goals.size) {
      return this._goals;
    }
    const goals = await getFromStorage('goals');
    this._goals = new Map(goals);
    return this._goals;
  }

  public async getGoal(id: string): Promise<Goal> {
    if (!this._goals.size) {
      await this.getGoals();
    }

    const goal = this._goals.get(id);
    if (goal) {
      return goal;
    }

    throw new Error(
      `You do not have any goals with id ${id}. Total goals found: ${this._goals.size}`,
    );
  }

  public async createGoal(newGoal: Goal) {
    await this.getGoals();
    this._goals.set(newGoal.id, newGoal);
    await setInStorage('goals', Array.from(this._goals.entries()));
    this.emitEvent('goals', this._goals);
  }

  public async updateGoal(updatedGoal: Goal) {
    await this.getGoals();
    this._goals.set(updatedGoal.id, updatedGoal);
    await setInStorage('goals', Array.from(this._goals.entries()));
    this.emitEvent('goals', this._goals);
    this.emitEvent(`goal:${updatedGoal.id}`, updatedGoal);
  }

  public subscribe(
    subscriptionType: 'goals',
    subscriptionHandler: (goals: Map<string, Goal>) => void,
  ): void;
  public subscribe(
    subscriptionType: `goal:${string}`,
    subscriptionHandler: (goal: Goal) => void,
  ): void;
  public subscribe(
    subscriptionType: string,
    subscriptionHandler: Function,
  ): void {
    const handlers = this._subscriptions.get(subscriptionType) || [];
    handlers.push(subscriptionHandler);
    this._subscriptions.set(subscriptionType, handlers);
  }

  public unsubscribe(
    subscriptionType: string,
    subscriptionHandler: Function,
  ): void {
    const handlers = this._subscriptions.get(subscriptionType) || [];
    const index = handlers.indexOf(subscriptionHandler);
    if (index !== -1) {
      handlers.splice(index, 1);
      this._subscriptions.set(subscriptionType, handlers);
    }
  }

  private emitEvent(subscriptionType: 'goals', data: Map<string, Goal>): void;
  private emitEvent(subscriptionType: `goal:${string}`, data: Goal): void;
  private emitEvent(subscriptionType: string, data: any): void {
    const handlers = this._subscriptions.get(subscriptionType) || [];
    handlers.forEach(handler => handler(data));
  }
}
