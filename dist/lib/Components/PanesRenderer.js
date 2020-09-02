var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import * as React from 'react';
import { Pane, PaneContent } from './Pane';
import { isBrowserFirefox } from '../Functions';
import { shouldRenderTopSticky, shouldRenderMiddleRange, shouldRenderLeftSticky, shouldRenderCenterRange } from '../Functions/paneRendererPredicates';
import { columnsSlicer, rowsSlicer } from '../Functions/rangeSlicer';
export var PanesRenderer = function (props) {
    var _a, _b;
    var state = props.state, cellRenderer = props.cellRenderer;
    var cellMatrix = state.cellMatrix;
    var renderTopSticky = shouldRenderTopSticky(state), renderMiddleRange = shouldRenderMiddleRange(state), renderLeftSticky = shouldRenderLeftSticky(state), renderCenterRange = shouldRenderCenterRange(state);
    if (!renderTopSticky && !renderMiddleRange && !renderLeftSticky && !renderCenterRange) {
        return null;
    }
    var visibleScrollableRange = renderMiddleRange && cellMatrix.scrollableRange.slice(state.visibleRange, 'rows');
    var areOnlyStickyRows = cellMatrix.ranges.stickyTopRange.rows.length === cellMatrix.rows.length;
    var areOnlyStickyCols = cellMatrix.ranges.stickyLeftRange.columns.length === cellMatrix.columns.length;
    return (React.createElement(React.Fragment, null,
        React.createElement(Pane, { renderChildren: renderMiddleRange && renderCenterRange, className: 'rg-pane-center-middle', style: {
                position: 'relative',
                width: ((_a = state.props) === null || _a === void 0 ? void 0 : _a.enableFullWidthHeader) ? "calc(100% - " + cellMatrix.ranges.stickyLeftRange.width + "px)"
                    : cellMatrix.scrollableRange.width,
                height: (areOnlyStickyRows || areOnlyStickyCols) ? 0 : cellMatrix.scrollableRange.height,
                order: 3,
            } },
            React.createElement(PaneContent, { state: state, range: columnsSlicer(visibleScrollableRange)(state.visibleRange), borders: { right: false, bottom: false }, cellRenderer: cellRenderer })),
        React.createElement(Pane, { renderChildren: renderMiddleRange && renderLeftSticky, className: 'rg-pane-left', style: __assign({ height: areOnlyStickyRows && areOnlyStickyCols ? 0 : cellMatrix.scrollableRange.height, width: areOnlyStickyRows
                    ? 0
                    : areOnlyStickyCols ? cellMatrix.ranges.stickyLeftRange.width : cellMatrix.width - cellMatrix.scrollableRange.width, order: 2 }, (isBrowserFirefox() && { zIndex: 1 })) },
            React.createElement(PaneContent, { state: state, range: rowsSlicer(cellMatrix.ranges.stickyLeftRange)(visibleScrollableRange), borders: { bottom: true, right: true }, cellRenderer: cellRenderer })),
        React.createElement(Pane, { renderChildren: renderTopSticky && renderCenterRange, className: 'rg-pane-top', style: __assign({ width: ((_b = state.props) === null || _b === void 0 ? void 0 : _b.enableFullWidthHeader) ? "calc(100% - " + cellMatrix.ranges.stickyLeftRange.width + "px)"
                    : areOnlyStickyRows && areOnlyStickyCols ? 0 : cellMatrix.scrollableRange.width, height: cellMatrix.ranges.stickyTopRange.height, order: 1 }, (isBrowserFirefox() && { zIndex: 1 })) },
            React.createElement(PaneContent, { state: state, range: columnsSlicer(cellMatrix.ranges.stickyTopRange)((state.visibleRange)), borders: { right: false, bottom: false }, cellRenderer: cellRenderer })),
        React.createElement(Pane, { renderChildren: renderTopSticky && renderLeftSticky, className: 'rg-pane-top rg-pane-left', style: __assign({ height: cellMatrix.ranges.stickyTopRange.height, width: (areOnlyStickyRows && areOnlyStickyCols)
                    ? cellMatrix.ranges.stickyLeftRange.width
                    : cellMatrix.width - cellMatrix.scrollableRange.width, order: 0 }, (isBrowserFirefox() && { zIndex: 2 })) },
            React.createElement(PaneContent, { state: state, range: rowsSlicer(cellMatrix.ranges.stickyLeftRange)(cellMatrix.ranges.stickyTopRange), borders: { bottom: true, right: true }, cellRenderer: cellRenderer }))));
};