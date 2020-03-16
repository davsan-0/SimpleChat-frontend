import moment from "moment";

const parseDate = date => {
  const tempDate = moment(date);
  const fromNow = tempDate.fromNow();

  return fromNow;
};

export default parseDate;
