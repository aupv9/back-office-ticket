import * as React from 'react';
import {useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import LabelIcon from '@material-ui/icons/Label';
import { makeStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import * as _ from 'lodash';
import {
    useTranslate,
    DashboardMenuItem,
    MenuItemLink,
    MenuProps,
    ReduxState, usePermissions,
} from 'react-admin';


import SubMenu from './SubMenu';
import {
    AccessibilityTwoTone, AddShoppingCart,
    AttachMoney, CardTravel,
    Category, CollectionsBookmark, ConfirmationNumber, DashboardSharp, DeleteForever,
    EmojiPeopleOutlined, EventSeat,
    Fastfood, FormatListNumbered, History,
    LocationCityOutlined, MeetingRoom,
    MoneyTwoTone,
    MovieCreationSharp,
    MovieFilter, PaymentSharp, People, QuestionAnswer, Reorder, RoomRounded, RoomServiceOutlined,
    RoomServiceSharp, RoomSharp, Settings, SettingsCellSharp, SettingsPower, ShowChart,
    SupervisedUserCircle,
    SupervisedUserCircleRounded,
    TheatersSharp, TheatersTwoTone, TimelapseOutlined,
    Videocam,
    ViewCompact,
    ViewDay,
    ViewHeadline,
    Visibility,
    WallpaperTwoTone,
    YoutubeSearchedForOutlined
} from "@material-ui/icons";
import LocalOfferIcon from "@material-ui/icons/LocalOfferOutlined";
import SettingsIcon from "@material-ui/icons/Settings";



const Menu = ({ dense = false }) => {
    const { loaded, permissions } = usePermissions();
    const [arrPermission,setArrPermission] = useState([]);
    const [state, setState] = useState({
        menuManageBase: false,
        menuFilm: false,
        menuOrders: false,
        menuConcessions:false,
        menuShowTimes:false,
        menuTicket:false,
        menuPayment:false,
        menuOffer:false,
        menuStatistics:false,
        menuHR:false
    });
    const translate = useTranslate();
    const open = useSelector((state) => state.admin.ui.sidebarOpen);
    useSelector((state) => state.theme); // force rerender on theme change
    const classes = useStyles();


    const handleToggle = (menu) => {
        setState(state => ({ ...state, [menu]: !state[menu] }));
    };

    const isHavePermission = (permission) =>{
        return _.includes(arrPermission,permission);
    }
    useEffect(() =>{
        setArrPermission(permissions);
    },[permissions])

    return (
        <div
            className={classnames(classes.root, {
                [classes.open]: open,
                [classes.closed]: !open,
            })}
        >
            {' '}
            <DashboardMenuItem />
            {/*<SubMenu*/}
            {/*    handleToggle={() => handleToggle('menuStatistics')}*/}
            {/*    isOpen={state.menuStatistics}*/}
            {/*    name="Dash Board"*/}
            {/*    icon={<DashboardSharp/>}*/}
            {/*    dense={dense}*/}
            {/*>*/}
            {/*    <MenuItemLink*/}
            {/*        to={{*/}
            {/*            pathname: '/dashboard-default',*/}
            {/*            state: { _scrollToTop: true },*/}
            {/*        }}*/}
            {/*        primaryText={translate(`Default`, {*/}
            {/*            smart_count: 2,*/}
            {/*        })}*/}
            {/*        leftIcon={<Reorder />}*/}
            {/*        dense={dense}*/}
            {/*    />*/}
            {/*    <MenuItemLink*/}
            {/*        to={{*/}
            {/*            pathname: '/statistics-room',*/}
            {/*            state: { _scrollToTop: true },*/}
            {/*        }}*/}
            {/*        primaryText={translate(`Room`, {*/}
            {/*            smart_count: 2,*/}
            {/*        })}*/}
            {/*        leftIcon={<FormatListNumbered />}*/}
            {/*        dense={dense}*/}
            {/*    />*/}
            {/*</SubMenu>*/}
            {
                isHavePermission("SETUP_BASE") &&  !isHavePermission("READ_USER") &&

                <SubMenu
                    handleToggle={() => handleToggle('menuManageBase')}
                    isOpen={state.menuManageBase}
                    name="Manage Base"
                    icon={<SettingsIcon/>}
                    dense={dense}
                >
                    {
                        isHavePermission("READ_LOCATION") &&
                        <MenuItemLink
                            to={{
                                pathname: '/locations',
                                state: { _scrollToTop: true },
                            }}
                            primaryText={translate(`Location`, {
                                smart_count: 2,
                            })}
                            leftIcon={<RoomSharp />}
                            dense={dense}
                        />
                    }
                    {
                        isHavePermission("READ_THEATER") &&
                        <MenuItemLink
                            to={{
                                pathname: '/theaters',
                                state: { _scrollToTop: true },
                            }}
                            primaryText={translate(`Theater`, {
                                smart_count: 2,
                            })}
                            leftIcon={<TheatersTwoTone />}
                            dense={dense}
                        />
                    }
                    {
                        isHavePermission("READ_ROOM") &&
                        <MenuItemLink
                            to={{
                                pathname: '/rooms',
                                state: { _scrollToTop: true },
                            }}
                            primaryText={translate(`Room`, {
                                smart_count: 2,
                            })}
                            leftIcon={<MeetingRoom />}
                            dense={dense}
                        />
                    }

                    {
                        isHavePermission("READ_SEAT") &&
                        <MenuItemLink
                            to={{
                                pathname: '/seats',
                                state: { _scrollToTop: true },
                            }}
                            primaryText={translate(`Seats`, {
                                smart_count: 2,
                            })}
                            leftIcon={<EventSeat />}
                            dense={dense}
                        />
                    }
                    {
                        isHavePermission("READ_SERVICE") &&
                        <MenuItemLink
                            to={{
                                pathname: '/services',
                                state: { _scrollToTop: true },
                            }}
                            primaryText={translate(`Services Room`, {
                                smart_count: 2,
                            })}
                            leftIcon={<RoomServiceOutlined   />}
                            dense={dense}
                        />
                    }
                    {
                        isHavePermission("READ_CONCESSION") &&
                        <MenuItemLink
                            to={{
                                pathname: '/concessions',
                                state: { _scrollToTop: true },
                            }}
                            primaryText={translate(`Fast Food`, {
                                smart_count: 2,
                            })}
                            leftIcon={<Fastfood />}
                            dense={dense}
                        />
                    }

                    {
                        isHavePermission("READ_CATEGORY") &&
                        <MenuItemLink
                            to={{
                                pathname: '/categories',
                                state: { _scrollToTop: true },
                            }}
                            primaryText={translate(`Category`, {
                                smart_count: 2,
                            })}
                            leftIcon={<Category/>}
                            dense={dense}
                        />
                    }
                </SubMenu>
            }

            {
                isHavePermission("READ_MOVIE") &&  !isHavePermission("READ_USER") &&
                <SubMenu
                    handleToggle={() => handleToggle('menuFilm')}
                    isOpen={state.menuFilm}
                    name="Manage Movie"
                    icon={<MovieCreationSharp />}
                    dense={dense}
                >
                    {
                        <MenuItemLink
                            to={{
                                pathname: '/movies',
                                state: { _scrollToTop: true },
                            }}
                            primaryText={translate(`Movie`, {
                                smart_count: 2,
                            })}
                            leftIcon={<MovieFilter />}
                            dense={dense}
                        />
                    }

                    {/*<MenuItemLink*/}
                    {/*    to={{*/}
                    {/*        pathname: '/categories',*/}
                    {/*        state: { _scrollToTop: true },*/}
                    {/*    }}*/}
                    {/*    primaryText={translate(`resources.categories.name`, {*/}
                    {/*        smart_count: 2,*/}
                    {/*    })}*/}
                    {/*    // leftIcon={<categories.icon />}*/}
                    {/*    dense={dense}*/}
                    {/*/>*/}
                </SubMenu>
            }

            {
                isHavePermission("READ_SHOWTIME") &&  !isHavePermission("READ_USER") &&
                <SubMenu
                    handleToggle={() => handleToggle('menuShowTimes')}
                    isOpen={state.menuShowTimes}
                    name="Show Times"
                    icon={<ViewHeadline   />}
                    dense={dense}
                >
                    {
                        <MenuItemLink
                            to={{
                                pathname: '/showTimesDetails',
                                state: { _scrollToTop: true },
                            }}
                            primaryText={translate(`Show Times`, {
                                smart_count: 2,
                            })}
                            leftIcon={<Videocam/>}
                            dense={dense}
                        />
                    }


                </SubMenu>
            }

            {
                isHavePermission("READ_OFFER") &&  !isHavePermission("READ_USER") &&
                <SubMenu
                    handleToggle={() => handleToggle('menuOffer')}
                    isOpen={state.menuOffer}
                    name="Offer"
                    icon={<LocalOfferIcon   />}
                    dense={dense}
                >
                    {
                        <MenuItemLink
                            to={{
                                pathname: '/offers',
                                state: { _scrollToTop: true },
                            }}
                            primaryText={translate(`DashBoard`, {
                                smart_count: 2,
                            })}
                            leftIcon={<DashboardSharp/>}
                            dense={dense}
                        />
                    }
                    {
                        isHavePermission("READ_OFFER_DETAIL") &&
                        <MenuItemLink
                            to={{
                                pathname: '/offers-detail',
                                state: { _scrollToTop: true },
                            }}
                            primaryText={translate(`Offer Detail`, {
                                smart_count: 2,
                            })}
                            leftIcon={<LocalOfferIcon />}
                            dense={dense}
                        />
                    }
                    {
                        isHavePermission("READ_OFFER_HISTORY") &&
                        <MenuItemLink
                            to={{
                                pathname: '/offers-history',
                                state: { _scrollToTop: true },
                            }}
                            primaryText={translate(`Offer History`, {
                                smart_count: 2,
                            })}
                            leftIcon={<History />}
                            dense={dense}
                        />
                    }


                </SubMenu>
            }


            {
                isHavePermission("READ_SHOW") &&  !isHavePermission("READ_USER") &&
                <SubMenu
                    handleToggle={() => handleToggle('menuOrders')}
                    isOpen={state.menuOrders}
                    name="Orders"
                    icon={<AddShoppingCart   />}
                    dense={dense}
                >
                    {
                        isHavePermission("READ_ORDER") &&
                        <MenuItemLink
                            to={{
                                pathname: '/orders',
                                state: { _scrollToTop: true },
                            }}
                            primaryText={translate(`Orders`, {
                                smart_count: 2,
                            })}
                            leftIcon={<MoneyTwoTone/>}
                            dense={dense}
                        />
                    }

                    {
                        isHavePermission("READ_MY_ORDER") &&
                        <MenuItemLink
                            to={{
                                pathname: '/my-orders',
                                state: { _scrollToTop: true },
                            }}
                            primaryText={translate(`My Orders`, {
                                smart_count: 2,
                            })}
                            leftIcon={<QuestionAnswer />}
                            dense={dense}
                        />
                    }
                    {
                        isHavePermission("READ_SHOW") &&
                        <MenuItemLink
                            to={{
                                pathname: '/shows',
                                state: { _scrollToTop: true },
                            }}
                            primaryText={translate(`Shows Theater`, {
                                smart_count: 2,
                            })}
                            leftIcon={<TimelapseOutlined/>}
                            dense={dense}
                        />
                    }
                    {
                        isHavePermission("READ_PAYMENT") &&
                        <MenuItemLink
                            to={{
                                pathname: '/payments',
                                state: { _scrollToTop: true },
                            }}
                            primaryText={translate(`Payments`, {
                                smart_count: 2,
                            })}
                            leftIcon={<PaymentSharp/>}
                            dense={dense}
                        />
                    }

                </SubMenu>
            }



            {/*<SubMenu*/}
            {/*    handleToggle={() => handleToggle('menuPayment')}*/}
            {/*    isOpen={state.menuPayment}*/}
            {/*    name="Payment List"*/}
            {/*    icon={<PaymentSharp   />}*/}
            {/*    dense={dense}*/}
            {/*>*/}
            {/*  */}

            {/*</SubMenu>*/}


            {/*<SubMenu*/}
            {/*    handleToggle={() => handleToggle('menuTicket')}*/}
            {/*    isOpen={state.menuTicket}*/}
            {/*    name="Ticket"*/}
            {/*    icon={<CollectionsBookmark   />}*/}
            {/*    dense={dense}*/}
            {/*>*/}
            {/*   */}
            {/*</SubMenu>*/}

            {
                isHavePermission("READ_USER") &&
                <SubMenu
                    handleToggle={() => handleToggle('menuHR')}
                    isOpen={state.menuHR}
                    name="Human Resources"
                    icon={<SupervisedUserCircle   />}
                    dense={dense}
                >

                    <MenuItemLink
                        to={{
                            pathname: '/users',
                            state: { _scrollToTop: true },
                        }}
                        primaryText={translate(`User`, {
                            smart_count: 2,
                        })}
                        leftIcon={<SupervisedUserCircleRounded/>}
                        dense={dense}
                    />
                    {
                        isHavePermission("READ_EMPLOYEE") &&
                        <MenuItemLink
                            to={{
                                pathname: '/employees',
                                state: { _scrollToTop: true },
                            }}
                            primaryText={translate(`Employee`, {
                                smart_count: 2,
                            })}
                            leftIcon={<EmojiPeopleOutlined />}
                            dense={dense}
                        />
                    }
                    {
                        isHavePermission("READ_ROLE") &&
                        <MenuItemLink
                            to={{
                                pathname: '/roles',
                                state: { _scrollToTop: true },
                            }}
                            primaryText={translate(`Role List`, {
                                smart_count: 2,
                            })}
                            leftIcon={<People />}
                            dense={dense}
                        />
                    }

                </SubMenu>
            }




        </div>
    );
};

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    open: {
        width: 200,
    },
    closed: {
        width: 55,
    },
}));

export default Menu;
