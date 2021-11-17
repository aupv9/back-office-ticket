import * as React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import LabelIcon from '@material-ui/icons/Label';
import { makeStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import {
    useTranslate,
    DashboardMenuItem,
    MenuItemLink,
    MenuProps,
    ReduxState,
} from 'react-admin';


import SubMenu from './SubMenu';
import {
    AccessibilityTwoTone, AddShoppingCart,
    AttachMoney, CardTravel,
    Category, CollectionsBookmark, DashboardSharp,
    EmojiPeopleOutlined,
    Fastfood,
    LocationCityOutlined, MeetingRoom,
    MoneyTwoTone,
    MovieCreationSharp,
    MovieFilter, PaymentSharp, People, QuestionAnswer, RoomRounded,
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
    const [state, setState] = useState({
        menuManageBase: false,
        menuFilm: false,
        menuOrders: false,
        menuConcessions:false,
        menuShowTimes:false,
        menuTicket:false,
        menuPayment:false,
        menuOffer:false
    });
    const translate = useTranslate();
    const open = useSelector((state) => state.admin.ui.sidebarOpen);
    useSelector((state) => state.theme); // force rerender on theme change
    const classes = useStyles();

    const handleToggle = (menu) => {
        setState(state => ({ ...state, [menu]: !state[menu] }));
    };

    return (
        <div
            className={classnames(classes.root, {
                [classes.open]: open,
                [classes.closed]: !open,
            })}
        >
            {' '}
            <DashboardMenuItem />
            <SubMenu
                handleToggle={() => handleToggle('menuManageBase')}
                isOpen={state.menuManageBase}
                name="Manage Base"
                icon={<SettingsIcon/>}
                dense={dense}
            >
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
            </SubMenu>
            <SubMenu
                handleToggle={() => handleToggle('menuConcessions')}
                isOpen={state.menuConcessions}
                name="Concessions"
                icon={<Fastfood   />}
                dense={dense}
            >
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
            </SubMenu>
            <SubMenu
                handleToggle={() => handleToggle('menuFilm')}
                isOpen={state.menuFilm}
                name="Manage Movie"
                icon={<MovieCreationSharp />}
                dense={dense}
            >
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

            <SubMenu
                handleToggle={() => handleToggle('menuShowTimes')}
                isOpen={state.menuShowTimes}
                name="Show Times"
                icon={<ViewHeadline   />}
                dense={dense}
            >
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

            </SubMenu>

            <SubMenu
                handleToggle={() => handleToggle('menuOffer')}
                isOpen={state.menuOffer}
                name="Offer"
                icon={<LocalOfferIcon   />}
                dense={dense}
            >
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
                {/*<MenuItemLink*/}
                {/*    to={{*/}
                {/*        pathname: '/employees',*/}
                {/*        state: { _scrollToTop: true },*/}
                {/*    }}*/}
                {/*    primaryText={translate(`Employee`, {*/}
                {/*        smart_count: 2,*/}
                {/*    })}*/}
                {/*    leftIcon={<EmojiPeopleOutlined />}*/}
                {/*    dense={dense}*/}
                {/*/>*/}
            </SubMenu>


            <SubMenu
                handleToggle={() => handleToggle('menuOrders')}
                isOpen={state.menuOrders}
                name="Orders"
                icon={<AddShoppingCart   />}
                dense={dense}
            >
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
                <MenuItemLink
                    to={{
                        pathname: '/invoices',
                        state: { _scrollToTop: true },
                    }}
                    primaryText={translate(`Invoices`, {
                        smart_count: 2,
                    })}
                    leftIcon={<WallpaperTwoTone />}
                    dense={dense}
                />
            </SubMenu>

            <SubMenu
                handleToggle={() => handleToggle('menuPayment')}
                isOpen={state.menuPayment}
                name="Payment List"
                icon={<PaymentSharp   />}
                dense={dense}
            >
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
            </SubMenu>


            <SubMenu
                handleToggle={() => handleToggle('menuTicket')}
                isOpen={state.menuTicket}
                name="Ticket"
                icon={<CollectionsBookmark   />}
                dense={dense}
            >
                <MenuItemLink
                    to={{
                        pathname: '/shows',
                        state: { _scrollToTop: true },
                    }}
                    primaryText={translate(`Show Times`, {
                        smart_count: 2,
                    })}
                    leftIcon={<TimelapseOutlined/>}
                    dense={dense}
                />
                {/*<MenuItemLink*/}
                {/*    to={{*/}
                {/*        pathname: '/shows',*/}
                {/*        state: { _scrollToTop: true },*/}
                {/*    }}*/}
                {/*    primaryText={translate(`Shows`, {*/}
                {/*        smart_count: 2,*/}
                {/*    })}*/}
                {/*    leftIcon={<WallpaperTwoTone />}*/}
                {/*    dense={dense}*/}
                {/*/>*/}
            </SubMenu>

            <SubMenu
                handleToggle={() => handleToggle('menuResource')}
                isOpen={state.menuResource}
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
            </SubMenu>



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
