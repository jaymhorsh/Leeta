import { StyleSheet } from 'react-native';
import { colors } from './colors';

export const formStyles = StyleSheet.create({
  input: {
    width: '100%',
    height: 50,
    paddingHorizontal: 16,
    marginBottom: 8,
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: colors.primary,
    borderBottomWidth: 1,
    borderBottomColor: colors.primary,
  },
  labelClean: {
    fontSize: 16,
    fontFamily: 'Inter_700Bold',
    color: colors.textSecondary,
  },
  inputClean: {
    width: '100%',
    height: 30,
    paddingHorizontal: 16,
    marginBottom: 8,
    fontFamily: 'Inter_400Regular',
    fontSize: 18,
    color: colors.textSecondary,
    borderBottomWidth: 1,
    borderBottomColor: colors.textSecondary,
  },
  compactInputWrapper: {
    flexDirection: 'row',
    backgroundColor: colors.textSecondary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    height: 50,
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 16,
    shadowColor: '#000000',
    marginBottom: 8,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 1.0,
    elevation: 1,
  },
  compactInput: {
    width: '100%',
    marginLeft: 12,
  },
});
