import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import useDashboard, { withDashboard } from 'hooks/useDashboard';
import { useDispatch } from 'redux/store';

// material
import { styled, useTheme } from '@material-ui/core/styles';
import LoadingPage from 'components/LoadingPage';
import { fetchGlobalState } from 'redux/admin/thunk';
// hooks
import useCollapseDrawer from '../../hooks/useCollapseDrawer';
//
import DashboardNavbar from './DashboardNavbar';
import DashboardSidebar from './DashboardSidebar';

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 70;

const RootStyle = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden'
});

const MainStyle = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: APP_BAR_MOBILE + 12,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 12,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  }
}));

// ----------------------------------------------------------------------

function DashboardLayout() {
  const theme = useTheme();
  const { collapseClick } = useCollapseDrawer();
  const { open, setNavOpen: setOpen } = useDashboard();

  const [isLoadingState, setIsLoadingState] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    // fetch global
    setIsLoadingState(true);
    dispatch(fetchGlobalState()).then(() => setIsLoadingState(false));
  }, [dispatch]);

  if (isLoadingState) {
    return <LoadingPage />;
  }

  return (
    <RootStyle>
      <DashboardNavbar onOpenSidebar={() => setOpen(true)} />
      <DashboardSidebar isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} />
      <MainStyle
        sx={{
          transition: theme.transitions.create('margin', {
            duration: theme.transitions.duration.complex
          }),
          ...(collapseClick && {
            ml: '102px'
          })
        }}
      >
        <Outlet />
      </MainStyle>
    </RootStyle>
  );
}

export default withDashboard(DashboardLayout);
