import { useMemo } from 'react';

const useYearRange = (startYear = 1980) => {
  const years = useMemo(() => {
    const currentYear = new Date().getFullYear();
    const yearList = Array.from({ length: currentYear - startYear + 2 }, (_, index) => {
      const year = startYear + index;
      return { id: year, description: year.toString() };
    });

    return yearList;
  }, [startYear]);

  return years;
};

export default useYearRange;
