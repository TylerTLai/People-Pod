const PersonPic = ({ listView }) => {
  return (
    <img
      src="https://dummyimage.com/200x200/F3F4F7/8693ac"
      alt="placeholder"
      className={`rounded-md h-full w-${listView ? "32" : "full"} pt-2`}
    />
  );
};

export default PersonPic;
