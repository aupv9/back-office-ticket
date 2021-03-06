import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { useTranslate, useLocale, useSetLocale, Title,SimpleForm } from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';
import { changeTheme } from './actions';
const useStyles = makeStyles({
    label: { width: '10em', display: 'inline-block' },
    button: { margin: '1em' },
});

const Configuration = () => {
    const translate = useTranslate();
    const locale = useLocale();
    const setLocale = useSetLocale();
    const classes = useStyles();
    const theme = useSelector((state) => state.theme);
    const dispatch = useDispatch();
    return (
        <Card>
            <Title title={translate('pos.profile')} />
            <CardContent>
                <div className={classes.label}>
                    {translate('pos.theme.name')}
                </div>
                <Button
                    variant="contained"
                    className={classes.button}
                    color={theme === 'light' ? 'primary' : 'default'}
                    onClick={() => dispatch(changeTheme('light'))}
                >
                    {translate('pos.theme.light')}
                </Button>
                <Button
                    variant="contained"
                    className={classes.button}
                    color={theme === 'dark' ? 'primary' : 'default'}
                    onClick={() => dispatch(changeTheme('dark'))}
                >
                    {translate('pos.theme.dark')}
                </Button>
            </CardContent>
            <CardContent>
                <div className={classes.label}>{translate('pos.language')}</div>
                <Button
                    variant="contained"
                    className={classes.button}
                    color={locale === 'en' ? 'primary' : 'default'}
                    onClick={() => setLocale('en')}
                >
                    en
                </Button>
                <Button
                    variant="contained"
                    className={classes.button}
                    color={locale === 'vn' ? 'primary' : 'default'}
                    onClick={() => setLocale('vn')}
                >
                    vn
                </Button>
            </CardContent>
        </Card>
        // <Card className={classes.root}>
        //     <Title title={'Navidrome - ' + translate('menu.personal.name')} />
        //     <SimpleForm toolbar={null} variant={'outlined'}>
        //         <SelectTheme />
        //         <SelectLanguage />
        //         <SelectDefaultView />
        //         <NotificationsToggle />
        //         {config.lastFMEnabled && <LastfmScrobbleToggle />}
        //         {config.listenBrainzEnabled && <ListenBrainzScrobbleToggle />}
        //     </SimpleForm>
        // </Card>
    );
};

export default Configuration;
