import TAG_DATA from "@/src/shared/constants/mocks/tags";

const ChipTable = () => {
  return (
    <div className="min-h-75">
      <div className="space-y-8">
        {Object.entries(TAG_DATA).map(([category, tags]) => (
          <div key={category}>{tags.category}</div>
        ))}
      </div>
    </div>
  );
};

export default ChipTable;
