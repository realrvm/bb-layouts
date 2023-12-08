import { FC, memo } from "react";
import RangeSlider from "react-range-slider-input";

import "react-range-slider-input/dist/style.css";

type RangeInputProps = {
  setRangeValue: (val: number) => void;
};

export const RangeInput: FC<RangeInputProps> = memo(({ setRangeValue }) => {
  return (
    <RangeSlider
      className="bb__range-slider"
      defaultValue={[0, 0]}
      thumbsDisabled={[true, false]}
      rangeSlideDisabled={true}
      onInput={(val: number[]) => setRangeValue(val[1])}
    />
  );
});
