import React, {memo, useState} from "react";
import {AddonPanel, Placeholder} from "storybook/internal/components";
import {addons} from "storybook/internal/manager-api";
import {EVENTS} from "../constants";
import {STORY_PREPARED} from "storybook/internal/core-events";
import { styled } from '@storybook/core/theming';

interface PanelProps {
  active: boolean;
}

const AddonWrapper = styled.div({
  display: 'grid',
  gridTemplateRows: '1fr 39px',
  height: '100%',
  maxHeight: '100vh',
  overflowY: 'auto',
});

export const FormSubmitPanel: React.FC<PanelProps> = memo(function MyPanel(props) {
  let [formResultState, setFormResult] = useState([]);

  const channel = addons.getChannel();
  channel.on(EVENTS.SUBMIT_RESULT, (formResult) => {
    setFormResult(formResult);
  });
  channel.on(STORY_PREPARED, () => {
    setFormResult([]);
  });

  const IfEmpty = (props: {empty: boolean}) => {
    if (!props.empty) {
      return (<table className="docblock-argstable sb-unstyled css-hrlaic">
        <thead className="docblock-argstable-head">
        <tr>
          <th>Name</th>
          <th>Value</th>
        </tr>
        </thead>
        <tbody className="docblock-argstable-body">
        {
          formResultState.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.value}</td>
            </tr>
          ))
        }
        </tbody>
      </table>);
    } else {
      return (<Placeholder><p>No form result</p></Placeholder>);
    }
  }

  return (
    <AddonPanel {...props}>
      <AddonWrapper>
        <IfEmpty empty={formResultState.length <= 0} />
      </AddonWrapper>
    </AddonPanel>
  );
});
