import React from "react";

import SettingsContext from "./SettingsContext";

import { MOVIE_INFOS } from "../constants";

const infosAllChecked = MOVIE_INFOS.reduce(
  (obj, info) => ({ ...obj, [info]: true }),
  {}
);
const infosAllUnchecked = MOVIE_INFOS.reduce(
  (obj, info) => ({ ...obj, [info]: false }),
  {}
);

export default class SettingsProvider extends React.Component {
  state = { infos: infosAllUnchecked };

  toggleInfo = info =>
    this.setState(({ infos }) => ({
      infos: { ...infos, [info]: !infos[info] }
    }));

  toggleAllInfos = checked =>
    this.setState({ infos: checked ? infosAllChecked : infosAllUnchecked });

  render() {
    const { infos } = this.state;
    return (
      <SettingsContext.Provider
        value={{
          infos,
          toggleInfo: this.toggleInfo,
          toggleAllInfos: this.toggleAllInfos
        }}
      >
        {this.props.children}
      </SettingsContext.Provider>
    );
  }
}
