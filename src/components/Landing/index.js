import React from 'react'

import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Icon from '@material-ui/core/Icon';
import AddOutlinedIcon from '@material-ui/icons/AddCircleOutline';
import GrainIcon from '@material-ui/icons/Grain';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import FavoriteIcon from '@material-ui/icons/Favorite';
import VisibilityIcon from '@material-ui/icons/Visibility';
import ListIcon from '@material-ui/icons/List';
import BookIcon from '@material-ui/icons/Book';

import Footer from './Footer'
import GoToHttps from './GoToHttps'
import LoadDemoSitemarks from './LoadDemoSitemarks'
import { LandingContainer, LandingTitle, FeatureGrid, FeatureHeader } from './styled'

const Landing = () => (
  <LandingContainer>
    <GoToHttps />
    <LandingTitle variant="h4"> Welcome to webmarks </LandingTitle>
    <Typography variant="body1"> This is how it works </Typography>
    <LoadDemoSitemarks />
    <Typography variant="body1" paragraph>
      These are your sitemarks. Click on them and watch them work.
    </Typography>

    <FeatureHeader variant="h5" paragraph>
      Features:
    </FeatureHeader>
    <Grid container spacing={8}>
      <FeatureGrid item xs={12} md={4}><Icon><AddOutlinedIcon fontSize="large" /></Icon><span>Add as many sites you want</span></FeatureGrid>
      <FeatureGrid item xs={12} md={4}><Icon><GrainIcon fontSize="large" /></Icon><span>Group them in categories, and create the categories you need</span></FeatureGrid>
      <FeatureGrid item xs={12} md={4}><Icon><DoneAllIcon fontSize="large" /></Icon><span>Rate them to highlight your more important ones</span></FeatureGrid>
    </Grid>
    <Typography variant="body1" paragraph>
      Try seetting webmarks as your home page, for faster navigation to your favorite sites.
    </Typography>

    <FeatureHeader variant="h5" paragraph>
      Some ideas you can use Webmarks for:
    </FeatureHeader>
    <Grid container spacing={8}>
      <FeatureGrid item xs={12} md={6}><Icon><FavoriteIcon fontSize="large" /></Icon><span>Keep your favorite sites</span></FeatureGrid>
      <FeatureGrid item xs={12} md={6}><Icon><VisibilityIcon fontSize="large" /></Icon><span>Track of the sites on a research you are working on</span></FeatureGrid>
      <FeatureGrid item xs={12} md={6}><Icon><ListIcon fontSize="large" /></Icon><span>Organize the sites you are going to access in a presentation</span></FeatureGrid>
      <FeatureGrid item xs={12} md={6}><Icon><BookIcon fontSize="large" /></Icon><span>Frequent sites needed on a project</span></FeatureGrid>
    </Grid>

    <FeatureHeader variant="h5" paragraph>
      Interested?
    </FeatureHeader>
    <Typography variant="body1" paragraph>
      Click the register Button.
      <br />
      No passwords required, the code for login will be sent to your email.
    </Typography>
    <Footer />
  </LandingContainer>
)

export default Landing
