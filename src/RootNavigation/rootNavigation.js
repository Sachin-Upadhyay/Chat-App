import * as React from 'react';
import { createNavigationContainerRef } from '@react-navigation/native';

export const navigationRef = React.createRef();
// export const navigationRef1 = createNavigationContainerRef()

export function navigate(name, params) {
    // if (navigationRef1.isReady()) {
      console.log(navigationRef)
  navigationRef.current?.navigate(name, params);
    // }
}