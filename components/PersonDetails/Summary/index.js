const Summary = ({ person }) => {
  return (
    <section className="flex flex-col items-center justify-center border-b border-gray-200 pb-6">
      <img
        src="https://dummyimage.com/200x200/F3F4F7/8693ac"
        alt="placeholder"
        className="rounded-full w-2/5 h-auto mb-5"
      />
      <div className="flex flex-col w-full items-center">
        <h2 className="mb-1 text-2xl font-semibold tracking-wider uppercase title-font text-gray-800">
          {person.firstName} {person.lastName}
        </h2>
        <p className="my-1 text-gray-400 tracking-wider">{person.quickNotes}</p>
      </div>
    </section>
  );
};

export default Summary;
