import React from 'react'
import MainVisual from '../../components/landingPageComponents/mainVisual/MainVisual'
import TrademarkSection from '../../components/landingPageComponents/trademarkSection/TrademarkSection'
import MostPopularDishesSection from '../../components/landingPageComponents/mostPopularDishesSection/MostPopularDishesSection'
import "./landingPage.scss"
import PremiumSection from '../../components/landingPageComponents/premiumSection/PremiumSection'

export default function LandingPage () {
  return (
    <div className='LandingPage'>
        <MainVisual/>
         <TrademarkSection/>
        <MostPopularDishesSection/>
        <PremiumSection/>
    </div>
  )
}
