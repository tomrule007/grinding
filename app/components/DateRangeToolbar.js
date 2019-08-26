import React from 'react';

const DateRangeToolbar = () => {
  const monthDayYearToYearMonthDay = monthDayYear => {
    const [m, d, y] = monthDayYear.split('/');
    return `${y}-${m.length === 1 ? '0' : ''}${m}-${
      d.length === 1 ? '0' : ''
    }${d}`;
  };
  const rangeToDates = selectedRange => {
    // not efficient to constantly run this conversion should be initialized once and put in state

    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    // date = 0 returns last day of previous month
    const date = today.getDate();
    // Sunday - Saturday : 0 - 6
    const day = today.getDay();

    const monday = new Date(year, month, date - day + 1).toLocaleDateString(
      'en-US'
    );
    const sunday = new Date(year, month, date + (7 - day)).toLocaleDateString(
      'en-US'
    );
    const firstOfTheMonth = new Date(year, month, 1).toLocaleDateString(
      'en-US'
    );
    const lastOfTheMonth = new Date(year, month + 1, 0).toLocaleDateString(
      'en-US'
    );
    const lastWeekMonday = new Date(
      year,
      month,
      date - day - 6
    ).toLocaleDateString('en-US');
    const lastWeekSunday = new Date(year, month, date - day).toLocaleDateString(
      'en-US'
    );

    const firstOfLastMonth = new Date(year, month - 1, 1).toLocaleDateString(
      'en-US'
    );
    const lastOfLastMonth = new Date(year, month, 0).toLocaleDateString(
      'en-US'
    );

    switch (selectedRange) {
      case 'today':
        return [today.toLocaleDateString('en-US')];
      case 'thisWeek':
        return [monday, sunday];
      case 'thisMonth':
        return [firstOfTheMonth, lastOfTheMonth];
      case 'yesterday':
        return [new Date(year, month, date - 1).toLocaleDateString('en-US')];
      case 'lastWeek':
        return [lastWeekMonday, lastWeekSunday];
      case 'lastMonth':
        return [firstOfLastMonth, lastOfLastMonth];
      default:
        return 'ERROR: Please Report bug';
    }
  };
  const initialDates = rangeToDates('thisWeek');
  const [values, setValues] = React.useState({
    rangeType: 'CalendarRange',
    selectedRange: 'thisWeek',
    dates: initialDates,
    from: monthDayYearToYearMonthDay(initialDates[0]),
    to: monthDayYearToYearMonthDay(initialDates[1])
  });

  const handleChange = name => event => {
    // special case for 'selectedRange'
    if (name === 'selectedRange') {
      // also update dates
      setValues({
        ...values,
        selectedRange: event.target.value,
        dates: rangeToDates(event.target.value)
      });
    } else {
      // just update named value
      setValues({ ...values, [name]: event.target.value });
    }
  };

  return (
    <span>
      Date Range:
      <select
        id="dateRange"
        value={values.rangeType}
        onChange={handleChange('rangeType')}
      >
        <option value="CalendarRange">Calendar Range</option>
        <option value="DateRange">Date Range</option>
      </select>
      {values.rangeType === 'DateRange' && (
        <span>
          <label htmlFor="from">
            From:
            <input
              id="from"
              value={values.from}
              onChange={handleChange('from')}
              type="date"
            />
          </label>
          <label htmlFor="to">
            To:
            <input
              id="to"
              value={values.to}
              onChange={handleChange('to')}
              type="date"
            />
          </label>
        </span>
      )}
      {values.rangeType === 'CalendarRange' && (
        <span>
          <select
            value={values.selectedRange}
            onChange={handleChange('selectedRange')}
          >
            <optgroup label="Current">
              <option value="today">Today</option>
              <option value="thisWeek">This Week</option>
              <option value="thisMonth">This Month</option>
            </optgroup>
            <optgroup label="Past">
              <option value="yesterday">Yesterday</option>
              <option value="lastWeek">Last Week</option>
              <option value="lastMonth">Last Month</option>
            </optgroup>
          </select>
          {values.dates.length > 1
            ? `(${values.dates[0]} - ${values.dates[1]})`
            : `(${values.dates[0]})`}
        </span>
      )}
    </span>
  );
};

export default DateRangeToolbar;
