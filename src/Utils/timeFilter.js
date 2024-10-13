import moment from 'moment'

const now = moment();
console.log(now.valueOf())
console.log(now.clone().subtract(40, 'minutes').valueOf())
const timeFilter = [
  {
    startDate: now.clone().subtract(1, 'hour').valueOf(),
    endDate: now.clone().subtract(40, 'minutes').valueOf(),
    key: "lessCommunicating",
  },
  {
    startDate: 0,
    endDate: now.clone().subtract(1, 'hour').valueOf(),
    key: "notCommunicating",
  },
  {
    
    startDate: now.clone().subtract(40, 'minutes').valueOf(),
    endDate: 0,
    key: "frequentlyCommunicating",
  },
  {
    startDate: 0,
    endDate: 0,
    key: "notConnected",
  },
];

export default timeFilter;
