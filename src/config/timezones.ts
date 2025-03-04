const rawTimezones = Intl.supportedValuesOf('timeZone');

export const timezones = rawTimezones
  .map((timezone) => {
    const formatter = new Intl.DateTimeFormat('en', {
      timeZone: timezone,
      timeZoneName: 'shortOffset',
    });

    const parts = formatter.formatToParts(new Date());
    const offset =
      parts.find((part) => part.type === 'timeZoneName')?.value ?? '';
    const modifiedOffset = offset === 'GMT' ? 'GMT+0' : offset;

    return {
      value: timezone,
      label: `(${modifiedOffset}) ${timezone.replace(/_/g, ' ')}`,
      numericOffset: parseInt(
        offset.replace('GMT', '').replace('+', '') || '0',
      ),
    };
  })
  .sort((a, b) => a.numericOffset - b.numericOffset);
