export default function EventsBar(props) {
  return (
    <div className="w-[235px] flex flex-col items-center justify-start gap-[18px] text-5xl text-mediumslateblue lg:hidden lg:h-auto md:hidden text-left">
      <h2 className="m-0 relative text-inherit font-light font-inherit">
        Trending Events
      </h2>
      <div className="self-stretch flex flex-col items-start justify-center py-0 pr-0 pl-2 gap-[12px] text-left text-base text-gray-100">
        {props.events?.map((trending) => (
          <div
            key={trending.id}
            className="flex flex-row items-start justify-start"
          >
            <a
              href={trending.refLink}
              className="relative text-inherit no-underline"
            >
              🔥 {trending.eventName}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
