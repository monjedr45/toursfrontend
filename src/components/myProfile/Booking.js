import { ActionIcon, Box, Group, Text } from '@mantine/core';
import axios from 'axios';
import { DataTable } from 'mantine-datatable';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { FaEye } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';


export default function Booking() {

    const [myBooking, setMyBooking] = useState([])
    const [isPending, setIsPending] = useState(false)


    useEffect(() => {
        const unSub = async () => {
            setIsPending(true)
            try {
                const booking = await axios({
                    headers: {
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`
                    },
                    method: 'GET',
                    url: 'http://127.1.0.1:3000/api/v1/bookings/my',
                });

                setMyBooking(booking.data.data.data)
                setIsPending(false)
            } catch (err) {
                setIsPending(false)
            }
        }
        unSub()
    }, [])

    return (
        <div className='user-view__form-container' >
            <h2 className='heading-secondary ma-bt-md'>Your tour booking</h2>
            <Box sx={{ height: 300, width: 'auto' }}>

                <DataTable
                    minHeight={150}

                    noRecordsText="No Booking to show"
                    withBorder
                    borderRadius="sm"
                    withColumnBorders
                    striped
                    highlightOnHover
                    // provide data
                    records={myBooking}
                    fetching={isPending}
                    loaderColor={'#716caf'}
                    // define columns
                    columns={[
                        {
                            accessor: 'index',
                            title: '#',
                            textAlignment: 'right',
                            width: 40,
                            render: (record) => myBooking.indexOf(record) + 1,
                        },
                        {
                            accessor: 'tour.imageCover',
                            title: 'Tour Image',
                            render: ({ tour }) => (
                                <Group spacing={4} position="right" noWrap>
                                    <img className='form__user-photo' src={`http://127.1.0.1:3000/img/tours/${tour.imageCover}`} alt='tour' />
                                </Group>
                            ),
                        },
                        {
                            accessor: 'tour.name',
                            // this column has a custom title
                            title: 'Tour name',
                            // right-align column
                        },

                        {
                            accessor: 'tour.startDates',
                            title: 'Start Date',
                            render: ({ tour }) => (
                                <Group spacing={4} position="right" noWrap>
                                    <div style={moment().format() > tour.startDates[0] ? { color: 'red' } : { color: 'green' }}>
                                        {moment(tour.startDates[0]).format('LL')}
                                    </div>
                                </Group>
                            ),
                        },
                        {
                            accessor: 'price',
                            // this column has custom cell data rendering
                        },

                        {
                            accessor: 'actions',
                            title: <Text mr="xs">Row actions</Text>,
                            textAlignment: 'right',
                            render: ({ tour }) => (

                                <Group spacing={1} position="right" noWrap>
                                    <ActionIcon color="green" >
                                        <NavLink to={`/tour/${tour._id}`}>
                                            <FaEye size={16} />
                                        </NavLink>
                                    </ActionIcon>

                                </Group>
                            ),
                        },
                    ]}

                />
            </Box>
        </div>
    )
}