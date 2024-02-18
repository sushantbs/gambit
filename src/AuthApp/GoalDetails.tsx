import React from 'react';
import {View} from 'react-native';
import {theme} from '../styles';
import {BodyText, TitleText} from '../components/Fonts';

export const GoalDetails: React.FC<{route: any; navigation: any}> = ({
  route,
}) => {
  const {goal} = route.params;

  return (
    <View style={theme.container}>
      <TitleText>{goal.title}</TitleText>
      <BodyText>
        {JSON.stringify(goal.scheduledNotifications, null, 4)}
      </BodyText>
      <BodyText>{JSON.stringify(goal.measurements, null, 4)}</BodyText>
    </View>
  );
};
export default GoalDetails;
