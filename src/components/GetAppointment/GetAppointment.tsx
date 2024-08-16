import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useEffect, useState } from 'react';
import { Radio, RadioGroup } from '@headlessui/react';
import './getAppointment.css'
import Button from '../Button';
interface CalendarHour {
    hour: string;
    free: boolean;
}

interface CalendarDate {
    day: string;
    hours: CalendarHour[];
}

const appointmentConfirmed = [
    {
        date: '25/09/2024',
        hour: '11:00',
    },
    {
        date: '16/08/2024',
        hour: '09:00',
    },
    {
        date: '17/08/2024',
        hour: '10:00',
    },
    {
        date: '20/08/2024',
        hour: '11:00',
    },
    {
        date: '18/08/2024',
        hour: '13:00',
    },
]

async function createCalendar(): Promise<CalendarDate[]> {
    const calendar: CalendarDate[] = [];
    const today = new Date();
    const endDate = new Date(today);
    endDate.setMonth(today.getMonth() + 2);

    const hours: CalendarHour[] = [
        { hour: '09:00', free: true },
        { hour: '10:00', free: true },
        { hour: '11:00', free: true },
        { hour: '12:00', free: true },
        { hour: '13:00', free: true },
        { hour: '15:00', free: true },
        { hour: '16:00', free: true },
        { hour: '17:00', free: true },
        { hour: '18:00', free: true },
    ];

    let currentDate = new Date(today);

    while (currentDate <= endDate) {
        const dayString = `${String(currentDate.getDate()).padStart(2, '0')}/${String(currentDate.getMonth() + 1).padStart(2, '0')}/${currentDate.getFullYear()}`;
        const clonedHours = hours.map(hour => ({ ...hour }));

        clonedHours.forEach(hour => {
            if (appointmentConfirmed.some(appt => appt.date === dayString && appt.hour === hour.hour)) {
                hour.free = false;
            }
        });

        calendar.push({ day: dayString, hours: clonedHours });
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return calendar;
}

export default function GetAppointment() {
    const [calendar, setCalendar] = useState<CalendarDate[]>([]);
    const [appointment, setAppointment] = useState({
        date: '',
        hour: '',
        name: '',
        surname: '',
        phone: '',
        service: '',
    });

    useEffect(() => {
        const fetchCalendar = async () => {
            const twoMonthCalendar = await createCalendar();
            setCalendar(twoMonthCalendar);
        };

        fetchCalendar();
    }, []);

    const handleInputChange = (e: { target: { name: string; value: string; }; }) => {
        const { name, value } = e.target;
        setAppointment((prevAppointment) => ({
            ...prevAppointment,
            [name]: value,
        }));
    };

    const handleDateSelect = (date: string) => {
        console.log("Date selected:", date);
        setAppointment((prevAppointment) => ({
            ...prevAppointment,
            date: date,
            hour: '',
        }));
    };

    const handleHourSelect = (hour: string) => {
        setAppointment((prevAppointment) => ({
            ...prevAppointment,
            hour: hour,
        }));
    };

    const getHoursForDate = (selectedDate: string) => {
        const dateObj = calendar.find(date => date.day === selectedDate);
        return dateObj ? dateObj.hours : [];
    }

    const handleServiceSelect = (e: { target: { value: string; }; }) => {
        setAppointment((prevAppointment) => ({
            ...prevAppointment,
            service: e.target.value,
        }));
    };

    return (
        <section className="p-2">
            {/* Selezione della data */}
            <div className="pb-10 pt-5">
                <RadioGroup value={appointment.date} onChange={(value) => handleDateSelect(value)}>
                    <Swiper spaceBetween={5} slidesPerView={2}>
                        {calendar.map((date, index) => (
                            <SwiperSlide key={index}>
                                <Radio
                                    value={`${date.day}`}
                                    className={`group relative flex cursor-pointer border-4 border-black bg-white px-2 py-4 md:px-5 shadow-md focus:outline-none  data-[checked]:bg-green-300`}
                                >
                                    <div className="flex w-full justify-center items-center">
                                        <div className="text-sm">
                                            <p className="font-semibold">{`${date.day}`}</p>
                                        </div>
                                    </div>
                                </Radio>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </RadioGroup>
            </div>

            {/* Selezione dell'ora */}
            {appointment.date && (
                <div className=" pb-14">
                    <Swiper spaceBetween={5} slidesPerView={2}>
                        {getHoursForDate(appointment.date).map((hourObj, index) => (
                            <SwiperSlide
                                key={index}
                                onClick={() => hourObj.free && handleHourSelect(hourObj.hour)}
                            >
                                <div className={`p-4 border-4 border-black ${appointment.hour === hourObj.hour ? 'bg-green-300' : 'bg-white'} ${!hourObj.free ? 'opacity-50 cursor-not-allowed' : ''}`}>
                                    {hourObj.hour} - {hourObj.free ? 'Libero' : 'Occupato'}
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            )}

            {/* Form di input */}
            <div className="py-5 grid grid-cols-1 md:grid-cols-2 gap-10 gap-y-20">
                <div className='flex justify-center'>
                    <div className="brutalist-container">
                        <input
                            placeholder="TYPE HERE"
                            className="brutalist-input smooth-type"
                            type="text"
                            name="name"
                            value={appointment.name}
                            onChange={handleInputChange}
                        />
                        <label className="brutalist-label">Nome</label>
                    </div>
                </div>
                <div className='flex justify-center'>
                    <div className="brutalist-container">
                        <input
                            placeholder="TYPE HERE"
                            className="brutalist-input smooth-type"
                            type="text"
                            name="surname"
                            value={appointment.surname}
                            onChange={handleInputChange}
                        />
                        <label className="brutalist-label">Cognome</label>
                    </div>
                </div>
                <div className='flex justify-center'>
                    <div className="brutalist-container">
                        <input
                            placeholder="TYPE HERE"
                            className="brutalist-input smooth-type"
                            type="text"
                            name="phone"
                            value={appointment.phone}
                            onChange={handleInputChange}
                        />
                        <label className="brutalist-label">Numero di telefono</label>
                    </div>
                </div>
                <div className='flex justify-center'>
                    <div>
                        <div className="radio-tile-group">
                            <div className="input-container">
                                <input
                                    id="capelli"
                                    className="radio-button"
                                    type="radio"
                                    name="service"
                                    value="Taglio Capelli"
                                    checked={appointment.service === "Taglio Capelli"}
                                    onChange={handleServiceSelect}
                                />
                                <div className="radio-tile">
                                    <div className="icon walk-icon">
                                        <picture className='w-[24px]'>
                                            <img src="src/assets/img/capelli.png" alt="Taglio Capelli" />
                                        </picture>
                                    </div>
                                    <label htmlFor="capelli" className="radio-tile-label">Capelli</label>
                                </div>
                            </div>

                            <div className="input-container">
                                <input
                                    id="barba"
                                    className="radio-button"
                                    type="radio"
                                    name="service"
                                    value="Taglio Barba"
                                    checked={appointment.service === "Taglio Barba"}
                                    onChange={handleServiceSelect}
                                />
                                <div className="radio-tile">
                                    <div className="icon bike-icon">
                                        <picture className='w-[24px]'>
                                            <img src="src/assets/img/barba.png" alt="Taglio Barba" />
                                        </picture>
                                    </div>
                                    <label htmlFor="barba" className="radio-tile-label">Barba</label>
                                </div>
                            </div>

                            <div className="input-container">
                                <input
                                    id="completo"
                                    className="radio-button"
                                    type="radio"
                                    name="service"
                                    value="Completo"
                                    checked={appointment.service === "Completo"}
                                    onChange={handleServiceSelect}
                                />
                                <div className="radio-tile">
                                    <div className="icon car-icon">
                                        <picture className='w-[24px]'>
                                            <img src="src/assets/img/completo.png" alt="Completo" />
                                        </picture>
                                    </div>
                                    <label htmlFor="completo" className="radio-tile-label">Completo</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='grid grid-cols-2 '>
                <h2 className='font-black'>Riepilogo </h2>
                <p className='text-end font-bold'>{appointment.date}</p>
                <p className='font-semibold'> {appointment.name}</p>
                <p className='text-end font-bold'>{appointment.hour}</p>
                <p className='font-semibold'>{appointment.surname}</p>
                <p className='text-end font-bold'>{appointment.phone}</p>
                <p className='font-semibold'>{appointment.service}</p>
            </div>
            <div className='py-2 flex w-full'>
                <Button text="prendi appuntamento" />
            </div>
        </section>
    );
}
