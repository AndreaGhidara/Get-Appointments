import { Swiper, SwiperSlide } from 'swiper/react';
import { Radio, RadioGroup } from '@headlessui/react';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import 'swiper/css';
import { useEffect, useState } from 'react';

function SelectableSwiper({ options, onSelect, formatOption, selected, disabledOptions }) {

    const [selectedConfirm, setSelectedConfirm] = useState();

    useEffect(() => {
      console.log(disabledOptions);
    }, [])
    
  return (
    <RadioGroup value={selected} onChange={onSelect}>
        <p>prova : {selected}</p>
      <Swiper spaceBetween={50} slidesPerView={3}>
        {options.map((option, index) => (
          <SwiperSlide key={index}>
            <Radio
              value={option}
              disabled={disabledOptions.includes(formatOption(option))}
              className="group relative flex cursor-pointer rounded-lg bg-blue-400 py-4 px-5 text-white shadow-md transition focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white data-[checked]:bg-white/10"
            >
              <div className="flex w-full justify-between items-center">
                <div className="text-sm">
                  <p className="font-semibold text-white">{formatOption(option)}</p>
                </div>
                
                {selected === formatOption(option) && (
                  <CheckCircleIcon className="size-6 fill-white" />
                )}
              </div>
            </Radio>
          </SwiperSlide>
        ))}
      </Swiper>
    </RadioGroup>
  );
}

export default SelectableSwiper;

// const appoinmentConfirmed = [
//   {
//     date: '25/09/2024',
//     hour: '11:00',
//   },
//   {
//     date: '14/08/2024',
//     hour: '09:00',
//   },
//   {
//     date: '07/08/2024',
//     hour: '10:00',
//   },
//   {
//     date: '20/08/2024',
//     hour: '11:00',
//   },
//   {
//     date: '18/08/2024',
//     hour: '13:00',
//   },
// ]
