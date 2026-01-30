import React from 'react';
import Icon from 'react-native-vector-icons/Feather'; 
import { Colors } from '../../styles/globalStyles';

// generic wrapper to handle defaults
const VectorIcon = ({ name, color, size }) => (
  <Icon 
    name={name} 
    color={color || Colors.textSecondary} 
    size={size || 24} 
  />
);

export const UserIcon = (props) => <VectorIcon name="user" {...props} />;

export const MailIcon = (props) => <VectorIcon name="mail" {...props} />;

export const LockIcon = (props) => <VectorIcon name="lock" {...props} />;

export const EyeIcon = (props) => <VectorIcon name="eye" {...props} />;

export const EyeOffIcon = (props) => <VectorIcon name="eye-off" {...props} />;

export const ArrowLeftIcon = (props) => <VectorIcon name="arrow-left" {...props} />;

export const SearchIcon = (props) => <VectorIcon name="search" {...props} />;

export const BellIcon = (props) => <VectorIcon name="bell" {...props} />;

export const MenuIcon = (props) => <VectorIcon name="more-vertical" {...props} />;