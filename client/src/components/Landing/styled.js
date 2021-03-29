import styled from 'styled-components'

import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

export const LandingContainer = styled.div`
  margin: 80px 20px 0px;
`
export const LandingTitle = styled(Typography)`
  margin-top: 15px !important;
`
export const FeatureHeader = styled(Typography)`
  margin-bottom: 30px !important;
  @media(max-width: 960px) {
    text-align: center;
  }
`
export const FullWithWarning = styled(Paper)`
  margin: 80px 20px 0px;
  height: 50px;
  padding: 10px 20px;
  text-align: center;
  background-color: lightsalmon !important;
`
export const DemoSitemarks = styled(Paper)`
  margin: 10px 0px;
  padding: 30px 15px;
`
export const Footered = styled.footer`
  padding: 20px 0px;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: lightsalmon;
  color: white;
  text-align: center;
`
export const FeatureGrid = styled(Grid)`
  height: 175px;
  font-weight: 450;
  text-align: center;
  text-transform: uppercase;
  display: flex;
  flex-direction: column;
  span {
    max-width: 50%;
    margin-left: auto;
    margin-right: auto;
  }
  span:first-child {
    width: 100%;
    height: 35%;
  }
`
