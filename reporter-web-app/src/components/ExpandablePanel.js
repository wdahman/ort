/*
 * Copyright (c) 2018 HERE Europe B.V.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 * License-Filename: LICENSE
 */

import React, { Component, cloneElement, Children } from 'react';
import PropTypes from 'prop-types';

// Inspired by https://www.dzurico.com/react-create-reusable-composable-components/
class ExpandablePanel extends Component {
    state = {
        show: false
    };

    toggleExpandContent = (e) => {
        e.stopPropagation();
        this.setState(prevState => ({
            show: !prevState.show
        }));
    };

    render() {
        const { children } = this.props;
        const { show } = this.state;
        const childrenClonedWithNewProps = Children.map(
            children,
            (child) => {
                // Do not display content if `show` is false
                if (child.type.name === 'expandablePanelContent' && !show) {
                    return null;
                }
                // Map the toggle event on the title
                if (child.type.name === 'expandablePanelTitle') {
                    return cloneElement(child, {
                        onToggle: this.toggleExpandContent,
                        show
                    });
                }
                return cloneElement(child);
            }
        );

        return <div>{childrenClonedWithNewProps}</div>;
    }
}

ExpandablePanel.propTypes = {
    children: PropTypes.node.isRequired
};

export default ExpandablePanel;
