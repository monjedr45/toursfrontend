import React from 'react'
import { FaBriefcase, FaMapMarkerAlt, FaStar, FaUserEdit, FaUsersCog } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'
import AccountSettingForm from '../components/myProfile/AccountSettingForm'
import PasswordChangeForm from '../components/myProfile/PasswordChangeForm'
import { useAuthContext } from '../hooks/useAuthContext'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Booking from '../components/myProfile/Booking'
import '../components/myProfile/myProfile.css'

export default function MyProfile() {
    const { user } = useAuthContext()
    
    return (
        <main className='main'>
            <Tabs className='user-view'>

                <nav className='user-view__menu'>
                    <TabList className='side-nav'>
                        <Tab >
                            <NavLink><FaUserEdit />| Setting</NavLink>
                        </Tab>
                        <Tab >
                            <NavLink><FaBriefcase />| My bookings</NavLink>
                        </Tab>
                    </TabList>
                    {user.role === 'admin' ? <div className='admin-nav' >
                        <h5 className='admin-nav__heading'>Admin</h5>
                        <ul className='side-nav'>
                            <li className=''>
                                <NavLink to='#'><FaMapMarkerAlt />| Manage tours</NavLink>
                            </li>
                            <li className=''>
                                <NavLink to='#'><FaUsersCog />| Manage users</NavLink>
                            </li>
                            <li className=''>
                                <NavLink to='#'><FaStar />| Manage reviews</NavLink>
                            </li>
                        </ul>
                    </div> : null}
                </nav>
                <div className='user-view__content'>
                    <TabPanel>
                        <AccountSettingForm />
                        <div className='line'>&nbsp;</div>
                        <PasswordChangeForm />
                    </TabPanel>
                    <TabPanel>
                        <Booking />
                    </TabPanel>
                </div>

            </Tabs>

        </main>
    )
}
