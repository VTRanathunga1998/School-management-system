const getLatestMonday = (): Date => {
  const today = new Date();

  // Always work in local time
  const dayOfWeek = today.getDay(); // 0=Sun, 1=Mon, ..., 6=Sat

  let offset: number;
  if (dayOfWeek >= 1 && dayOfWeek <= 5) {
    // Mon–Fri → previous Monday
    offset = -(dayOfWeek - 1);
  } else {
    // Sat (6) or Sun (0) → next Monday
    offset = dayOfWeek === 0 ? 1 : 8 - dayOfWeek;
  }

  const monday = new Date(today);
  monday.setDate(today.getDate() + offset);
  monday.setHours(0, 0, 0, 0); // normalize to local midnight

  return monday;
};

export const adjustScheduleToCurrentWeek = (
  lessons: { title: string; start: Date; end: Date }[]
): { title: string; start: Date; end: Date }[] => {
  const latestMonday = getLatestMonday();

  return lessons.map((lesson) => {
    // Determine weekday of the original lesson
    const lessonDayOfWeek = lesson.start.getDay(); // 0=Sun, 1=Mon, ... 6=Sat

    // Convert to offset from Monday (0 for Mon, 1 for Tue, ...)
    const daysFromMonday = lessonDayOfWeek === 0 ? 6 : lessonDayOfWeek - 1;

    // Build adjusted start
    const adjustedStartDate = new Date(latestMonday);
    adjustedStartDate.setDate(latestMonday.getDate() + daysFromMonday);
    adjustedStartDate.setHours(
      lesson.start.getHours(),
      lesson.start.getMinutes(),
      lesson.start.getSeconds(),
      0
    );

    // Build adjusted end (same weekday offset, same hours/minutes)
    const adjustedEndDate = new Date(latestMonday);
    adjustedEndDate.setDate(latestMonday.getDate() + daysFromMonday);
    adjustedEndDate.setHours(
      lesson.end.getHours(),
      lesson.end.getMinutes(),
      lesson.end.getSeconds(),
      0
    );

    return {
      title: lesson.title,
      start: adjustedStartDate,
      end: adjustedEndDate,
    };
  });
};
