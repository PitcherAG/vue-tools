import { addons } from '@storybook/addons';
import { create } from '@storybook/theming';

addons.setConfig({
  theme: create({
    // Base theme
    base: 'dark',
  
    // Custom branding
    brandImage: 'https://www.pitcher.com/hubfs/%5B2017%5D%20Pitcher%20Theme/images/Logo-White.svg',//'https://www.pitcher.com/hubfs/%5B2017%5D%20Pitcher%20Theme/images/Logo-Color.svg',
    brandTitle: 'PITCHER',
    brandUrl: 'http://www.pitcher.com'
  }),
  showRoots: false,
});
