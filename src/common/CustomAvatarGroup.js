import * as React from "react";
import PropTypes from "prop-types";
import { isFragment } from "react-is";
import clsx from "clsx";
import { withStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";

const SPACINGS = {
  small: -16,
  medium: null,
};

export const styles = (theme) => ({
  /* Styles applied to the root element. */
  root: {
    display: "flex",
  },
  /* Styles applied to the avatar elements. */
  avatar: {
    border: `2px solid ${theme.palette.background.default}`,
    marginLeft: -8,
  },
});

const CustomAvatarGroup = React.forwardRef(function CustomAvatarGroup(
  props,
  ref
) {
  const {
    children: childrenProp,
    classes,
    className,
    spacing = "medium",
    max = 5,
    ...other
  } = props;

  const children = React.Children.toArray(childrenProp).filter((child) => {
    if (process.env.NODE_ENV !== "production") {
      if (isFragment(child)) {
        console.error(
          [
            "Material-UI: the AvatarGroup component doesn't accept a Fragment as a child.",
            "Consider providing an array instead.",
          ].join("\n")
        );
      }
    }

    return React.isValidElement(child);
  });

  const extraAvatars = children.length > max ? children.length - max : 0;

  return (
    <div className={clsx(classes.root, className)} ref={ref} {...other}>
      {children.slice(0, children.length - extraAvatars).map((child, index) => {
        return React.cloneElement(child, {
          className: clsx(child.props.className, classes.avatar),
          style: {
            zIndex: -index - 1, // Changed zIndex generation for CSS to work properly
            marginLeft:
              spacing && SPACINGS[spacing] !== undefined
                ? SPACINGS[spacing]
                : -spacing,
            ...child.props.style,
          },
        });
      })}
      {extraAvatars ? (
        <Avatar
          className={classes.avatar}
          style={{
            zIndex: 0,
            marginLeft:
              spacing && SPACINGS[spacing] !== undefined
                ? SPACINGS[spacing]
                : -spacing,
          }}
        >
          +{extraAvatars}
        </Avatar>
      ) : null}
    </div>
  );
});

CustomAvatarGroup.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * The avatars to stack.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * Max avatars to show before +x.
   */
  max: PropTypes.number,
  /**
   * Spacing between avatars.
   */
  spacing: PropTypes.oneOfType([
    PropTypes.oneOf(["medium", "small"]),
    PropTypes.number,
  ]),
};

export default withStyles(styles, { name: "MuiAvatarGroup" })(
  CustomAvatarGroup
);
