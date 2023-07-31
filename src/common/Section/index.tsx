import { memo, useState, useRef, useEffect, useMemo, FC } from "react";
import { Link } from "react-router-dom";

import MoviesSlides from "./MoviesSlides";
import { SkelatonLoader } from "../Loader";
import Error from "../Error";

import { useGetShowsQuery } from "../../services/TMDB";
import { useTheme } from "../../context/themeContext";

import { getErrorMessage } from "../../utils/helper";

interface SectionProps {
  title: string;
  category: string;
  className?: string;
  type?: string;
  id?: number;
  showSimilarShows?: boolean;
}

const Section: FC<SectionProps> = ({
  title,
  category,
  className,
  type,
  id,
  showSimilarShows,
}) => {
  const [isInView, setIsInView] = useState<boolean>(false);
  const ref = useRef<HTMLElement | null>(null);
  const { theme } = useTheme();

  const {
    data = { results: [] },
    isLoading,
    isError,
    error,
  } = useGetShowsQuery(
    {
      category,
      type,
      page: 1,
      showSimilarShows,
      id,
    },
    {
      skip: !isInView,
    }
  );

  useEffect(() => {
    const observerHandler = (
      entries: IntersectionObserverEntry[],
      observer: IntersectionObserver
    ) => {
      const entry = entries[0];
      if (!entry.isIntersecting) return;
      setIsInView(true);
      observer.unobserve(entry.target);
    };

    const observer = new IntersectionObserver(observerHandler, {
      root: null,
      rootMargin: "580px",
      threshold: 0.1,
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const errorMessage = useMemo(
    () => (isError ? getErrorMessage(error) : ""),
    [error, isError]
  );

  const sectionStyle = `md:py-6 sm:py-[20.75px] xs:py-[18.75px] py-[16.75px] font-nunito ${className}`;
  const linkStyle = `sm:py-1 py-[2px] sm:text-[14px] xs:text-[12.75px] text-[12px] sm:px-4 px-3 rounded-full ${
    theme === "Dark" ? "view-all-btn--dark" : "view-all-btn--light"
  } dark:text-gray-300 hover:-translate-y-1 transition-all duration-300`;

  return (
    <section className={sectionStyle} ref={ref}>
      <div
        className={`flex flex-row justify-between items-center sm:mb-6 mb-[22.75px]`}
      >
        <h3 className="sm:text-[22.25px] xs:text-[20px] text-[18.75px] dark:text-gray-50 sm:font-bold font-semibold relative">
          <span>{title}</span>
          <div className="line" />
        </h3>
        {!showSimilarShows && (
          <Link to={`/${category}?type=${type}`} className={linkStyle}>
            View all
          </Link>
        )}
      </div>
      <div className="xs:min-h-[250px] min-h-[216px]">
        {isLoading ? (
          <SkelatonLoader />
        ) : isError ? (
          <Error
            error={String(errorMessage)}
            className="xs:h-[250px] h-[216px] text-[18px]"
          />
        ) : (
          <MoviesSlides
            movies={data.results.slice(0, 12)}
            category={category}
          />
        )}
      </div>
    </section>
  );
};

export default memo(Section);
