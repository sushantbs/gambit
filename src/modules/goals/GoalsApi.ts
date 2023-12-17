import {getFromStorage} from '../asyncStorage';
import {Goal, setInStorage} from '../asyncStorage/asyncStorage';

export class GoalsApi {
  private _subscriptions: Map<string, Function[]>;

  constructor() {
    this._subscriptions = new Map();
  }

  public async getGoals() {
    const goals = await getFromStorage('goals');
    return new Map(goals);
  }

  public async createGoal(newGoal: Goal) {
    const goals = await this.getGoals();
    goals.set(newGoal.id, newGoal);
    await setInStorage('goals', Array.from(goals.entries()));
    this.emitEvent('goals', goals);
  }

  public subscribe(
    subscriptionType: 'goals',
    subscriptionHandler: (goals: Map<string, Goal>) => void,
  ): void;
  public subscribe(
    subscriptionType: 'goal',
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
  private emitEvent(subscriptionType: string, data: any): void {
    const handlers = this._subscriptions.get(subscriptionType) || [];
    handlers.forEach(handler => handler(data));
  }
}
