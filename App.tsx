import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import React, {useState} from 'react';
import * as yup from 'yup';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {Formik} from 'formik';

// Form Validation
const passwordSchema = yup.object().shape({
  passwordLength: yup
    .number()
    .min(4, 'Should be minimum of 4 chars')
    .max(16, 'Should be max of 16 chars')
    .required('Password length is required'),
});
export default function App() {
  // Basic Declarations
  const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
  const symbolChars = '!@#$%^&*()_{}>?:';
  const numberChars = '0123456789';

  // States
  const isDarkMode = useColorScheme() === 'dark';
  const [password, setPassword] = useState<string>('');
  const [isPasswordGenerated, setIsPasswordGenerated] =
    useState<boolean>(false);
  const [numbers, setNumbers] = useState<boolean>(false);
  const [lowerCase, setLowerCase] = useState<boolean>(false);
  const [upperCase, setUpperCase] = useState<boolean>(false);
  const [symbols, setSymbols] = useState<boolean>(false);

  const generatePassword = (passwordLength: number) => {
    let allowedChars = '';

    if (lowerCase) {
      allowedChars += lowerCaseChars;
    }
    if (upperCase) {
      allowedChars += upperCaseChars;
    }
    if (numbers) {
      allowedChars += numberChars;
    }
    if (symbols) {
      allowedChars += symbolChars;
    }

    const generatedPassword = generatePasswordString(
      allowedChars,
      passwordLength,
    );

    setPassword(generatedPassword);
    setIsPasswordGenerated(true);
  };

  const generatePasswordString = (
    allowedChars: string,
    passwordLength: number,
  ): string => {
    let password = '';
    for (let i = 0; i < passwordLength; i++) {
      const charIndex: number = Math.floor(Math.random() * allowedChars.length);
      password += allowedChars.charAt(charIndex);
    }
    return password;
  };

  const resetPasswordState = () => {
    setPassword('');
    setIsPasswordGenerated(false);
    setNumbers(false);
    setLowerCase(false);
    setUpperCase(false);
    setSymbols(false);
  };

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <SafeAreaView>
        <View style={styles.formContainer}>
          <Text style={[styles.title, {color: isDarkMode ? '#FFF' : '#000'}]}>
            Password Generator
          </Text>
          <Formik
            initialValues={{passwordLength: ''}}
            validationSchema={passwordSchema}
            onSubmit={values => {
              generatePassword(+values.passwordLength);
            }}>
            {({
              values,
              errors,
              touched,
              isValid,
              handleChange,
              handleSubmit,
              handleReset,
            }) => (
              <>
                <View style={styles.inputWrapper}>
                  <View style={styles.inputColumn}>
                    <Text
                      style={[
                        styles.heading,
                        {color: isDarkMode ? '#FFF' : '#000'},
                      ]}>
                      Password Length
                    </Text>
                    {touched.passwordLength && errors.passwordLength && (
                      <Text style={styles.errorText}>
                        {errors.passwordLength}
                      </Text>
                    )}
                  </View>
                  <TextInput
                    style={[
                      styles.inputStyle,
                      {color: isDarkMode ? '#FFF' : '#000'},
                    ]}
                    value={values.passwordLength}
                    onChangeText={handleChange('passwordLength')}
                    placeholder="Ex. 8"
                    keyboardType="number-pad"
                  />
                </View>
                <View style={styles.inputWrapper}>
                  <Text
                    style={[
                      styles.heading,
                      {color: isDarkMode ? '#FFF' : '#000'},
                    ]}>
                    Include Lowercase
                  </Text>
                  <BouncyCheckbox
                    disableBuiltInState
                    isChecked={lowerCase}
                    onPress={() => {
                      setLowerCase(prevState => !prevState);
                    }}
                    fillColor="#29AB87"
                  />
                </View>
                <View style={styles.inputWrapper}>
                  <Text
                    style={[
                      styles.heading,
                      {color: isDarkMode ? '#FFF' : '#000'},
                    ]}>
                    Include Uppercase
                  </Text>
                  <BouncyCheckbox
                    disableBuiltInState
                    isChecked={upperCase}
                    onPress={() => {
                      setUpperCase(prevState => !prevState);
                    }}
                    fillColor="#FED85D"
                  />
                </View>
                <View style={styles.inputWrapper}>
                  <Text
                    style={[
                      styles.heading,
                      {color: isDarkMode ? '#FFF' : '#000'},
                    ]}>
                    Include Numbers
                  </Text>
                  <BouncyCheckbox
                    disableBuiltInState
                    isChecked={numbers}
                    onPress={() => {
                      setNumbers(prevState => !prevState);
                    }}
                    fillColor="#C9A0DC"
                  />
                </View>
                <View style={styles.inputWrapper}>
                  <Text
                    style={[
                      styles.heading,
                      {color: isDarkMode ? '#FFF' : '#000'},
                    ]}>
                    Include Symbols
                  </Text>
                  <BouncyCheckbox
                    disableBuiltInState
                    isChecked={symbols}
                    onPress={() => {
                      setSymbols(prevState => !prevState);
                    }}
                    fillColor="#FC80A5"
                  />
                </View>
                <View style={styles.formActions}>
                  <TouchableOpacity
                    disabled={!isValid}
                    style={styles.primaryBtn}
                    onPress={handleSubmit}>
                    <Text
                      style={[
                        styles.primaryBtnTxt,
                        {color: isDarkMode ? '#FFF' : '#000'},
                      ]}>
                      Generate Password
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.secondaryBtn}
                    onPress={() => {
                      handleReset();
                      resetPasswordState();
                    }}>
                    <Text
                      style={[
                        styles.secondaryBtnTxt,
                        {color: isDarkMode ? '#FFF' : '#000'},
                      ]}
                      onPress={() => {
                        handleReset();
                        resetPasswordState();
                      }}>
                      Reset
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </Formik>
        </View>
        {isPasswordGenerated ? (
          <View style={[styles.card, styles.cardElevated]}>
            <Text style={[styles.subTitle]}>Result</Text>
            <Text style={[styles.description]}>Long Press to copy</Text>
            <Text selectable={true} style={styles.generatedPassword}>
              {password}
            </Text>
          </View>
        ) : null}
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
  formContainer: {
    margin: 8,
    padding: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    marginBottom: 15,
  },
  subTitle: {
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 2,
  },
  description: {
    color: '#758283',
    marginBottom: 8,
  },
  heading: {
    fontSize: 15,
  },
  inputWrapper: {
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  inputColumn: {
    flexDirection: 'column',
  },
  inputStyle: {
    padding: 8,
    width: '30%',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#16213e',
  },
  errorText: {
    fontSize: 12,
    color: '#ff0d10',
  },
  formActions: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  primaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#5DA3FA',
  },
  primaryBtnTxt: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
  },
  secondaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#CAD5E2',
  },
  secondaryBtnTxt: {
    textAlign: 'center',
  },
  card: {
    padding: 12,
    borderRadius: 6,
    marginHorizontal: 12,
  },
  cardElevated: {
    backgroundColor: '#ffffff',
    elevation: 1,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  generatedPassword: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 12,
    color: '#000',
  },
});
