const BlogHeader = ({ blog }) => {
  const { title, description, author, createdAt } = blog;
  const { username, name, avatar } = author;
  const formattedDate = new Date(createdAt).toDateString();
  return (
    <div className="justify-center border-b border-charcoal-200 py-8">
      {/* Title and Description */}
      <div className="my-6 flex flex-col items-center justify-center font-mono">
        <div className="text-center text-5xl">{title}</div>
        <p className="text-center text-gray-600">{description}</p>
      </div>

      {/* User Information and blog written at date */}
      <div className="flex items-center justify-center divide-x-2 divide-gray-400">
        <div className="flex flex-row items-center pr-5">
          <div>
            <img className="mx-2 w-10 rounded-lg" src={avatar} alt="User Github logo" />
          </div>

          <div>
            <div className="mx-2 font-mono text-base font-medium antialiased">{name}</div>
            <div className="mx-2 font-mono text-xs font-medium antialiased">{username}</div>
          </div>
        </div>

        <div className="flex flex-col justify-start pl-5">
          <p className="mx-2 -mb-1 font-mono text-xs font-medium antialiased">written on,</p>
          <div className="mx-2 font-mono text-base font-medium text-gray-600 antialiased">
            {formattedDate}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogHeader;
