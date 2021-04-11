import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { Linkable } from '/imports/ui/App';
import "./main.css"

Meteor.startup(() => {
  render(<Linkable/>, document.getElementById('react-target'));
});
