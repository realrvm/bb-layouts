import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";

export const RangeInput = () => {
  return (
    <RangeSlider
      className='bb__range-slider'
      defaultValue={[0, 0]}
      thumbsDisabled={[true, false]}
      rangeSlideDisabled={true}
      onInput={console.log}
    />
  );
};
