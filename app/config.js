import { Dimensions, PixelRatio, Platform } from 'react-native';
import screenScale from './utils/screenScale';

const screen = Dimensions.get('window');

const UI_SCALE =
  screenScale(
    screen.width * screen.scale,
    screen.height * screen.scale,
    750,
    1334
  ) / screen.scale;

const PASSWORD_SECRET = 'r2JtLVFQFrk9jCZRkpYbgBc8xaY97Hbc';

export default {
  UI_SCALE,

  screen,

  REAL_SCREEN_WIDTH: screen.width * screen.scale,
  REAL_SCREEN_HEIGHT: screen.height * screen.scale,

  PASSWORD_SECRET
};
