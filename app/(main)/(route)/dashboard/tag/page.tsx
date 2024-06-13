import CreateTag from "./_components/create-tag";
import ManageTag from "./_components/manage-tag";

const TagDashBoardPage = () => {
  return (
    <div className="my-5">
      <CreateTag />
      <ManageTag />
    </div>
  );
};

export default TagDashBoardPage;
