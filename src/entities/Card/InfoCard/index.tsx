import clsx from "clsx";
import { InfoCardProps } from "./model/props.type";
import infoCardStyle from "./style";

const InfoCard = ({
  title,
  label,
  icon: Icon,
  iconColor = "indigo",
  subLabel,
  subLabelOnClick,
}: InfoCardProps) => {
  return (
    <div className={infoCardStyle.variants.container}>
      <div
        className={clsx(
          infoCardStyle.variants.icon[iconColor],
          "size-12 rounded-2xl flex items-center justify-center mb-4",
        )}
      >
        <Icon size={24} />
      </div>

      {/* <div className={infoCardStyle.variants.textContainer}> */}
      <p className={infoCardStyle.variants.title}>{title}</p>

      <div className="flex items-end justify-between">
        <p className={infoCardStyle.variants.label}>{label}</p>
        {subLabel && !subLabelOnClick && (
          <p className={infoCardStyle.variants.subLabel}>{subLabel}</p>
        )}
        {subLabel && subLabelOnClick && (
          <button
            type="button"
            onClick={subLabelOnClick}
            className={clsx(infoCardStyle.variants.subLabel, "cursor-pointer")}
          >
            {subLabel}
          </button>
        )}
      </div>
    </div>
    // </div>
  );
};

export default InfoCard;
