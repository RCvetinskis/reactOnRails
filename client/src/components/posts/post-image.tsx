type Props = {
  imgUrl: string;
};

const PostImage = ({ imgUrl }: Props) => {
  return (
    <div className="grid max-w-[600px] mx-auto min-h-[140px] w-full place-items-center rounded-lg p-6 ">
      <img
        className="object-cover object-center w-full aspect-square rounded-lg h-[350px]"
        src={imgUrl}
        alt="post image"
      />
    </div>
  );
};

export default PostImage;
