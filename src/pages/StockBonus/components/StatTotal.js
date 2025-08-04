import { StatisticValue, StatisticLabel, Statistic } from 'semantic-ui-react'

export default function StatTotal({total}) {
  return (
    <Statistic size='small'>
      <StatisticValue>{total}</StatisticValue>
      <StatisticLabel>合計金額</StatisticLabel>
    </Statistic>
  );
}
