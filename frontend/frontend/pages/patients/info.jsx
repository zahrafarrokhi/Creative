import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/dist/client/router";
import { useSelector, useDispatch } from "react-redux";
import {
  loadCities,
  loadSupplementaryInsurance,
} from "../../lib/slices/constant_data";
import { updatePatientInfo } from "../../lib/slices/patients";
import styles from "../../styles/PatientSelectionDialog.module.scss";
import { deconstruct } from "../../lib/utils";
// import MainIcon from "../../icons/main-icon-big.svg";
// import DatePicker from "../../components/DatePicker";
import ErrorComponent from "../../components/ErrorComponent";

// const inputValidation = (label, value) => {
//   console.log(
//     label,
//     value,
//     value && value !== "---" && value != "" && value != " "
//   );
//   if (label === "first_name") {
//     if (value && value !== "---" && value != "" && value != " ") {
//       console.log(label, " --> true");
//       return true;
//     } else {
//       console.log(label, " --> false");
//       return false;
//     }
//   } else if (label === "last_name") {
//     if (value && value != "---" && value != "" && value != " ") {
//       console.log(label, " --> true");
//       return true;
//     } else {
//       console.log(label, " --> false");
//       return false;
//     }
//   }
// };

const InputComponent = (props) => {
  const { pref, info, ind, value, onChange, setInputPermission, required } =
    props;
  console.log(info.id, info.required, required);



  return (
    <div
      key={ind}
      className={`m-3 justify-content-center align-self-center ${styles.item}`}
    >
      <label required={required} htmlFor={`field_${ind}`}>
        {info.label}
      </label>
      <input
        required={required}
        className="form-control"
        name={`field_${info.id}_${ind}`}
        id={`field_${info.id}_${ind}`}
        value={value}
        onChange={onChange}
        disabled={info.editable}
      />
    </div>
  );
};

InputComponent.propTypes = {
  info: PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    editable: PropTypes.bool,
  }).isRequired,
  ind: PropTypes.number.isRequired,
  value: PropTypes.any,
  onChange: PropTypes.func.isRequired,
};

const DateComponent = (props) => {
  const { pref, info, ind, value, onChange } = props;

  return (
    <div
      key={ind}
      className={`m-3 justify-content-center align-self-center ${styles.item}`}
    >
      <label htmlFor={`field_${ind}`}>{info.label}</label>
      {/* <DatePicker
        value={value}
        onChange={onChange}
        containerInputClassName={styles.info_datepicker_cnt}
        editable={!info.editable}
      /> */}
    </div>
  );
};

DateComponent.propTypes = {
  info: PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    editable: PropTypes.bool,
  }).isRequired,
  ind: PropTypes.number.isRequired,
  value: PropTypes.any,
  onChange: PropTypes.func.isRequired,
};

const InputGenderComponent = (props) => {
  const { pref, info, ind, value, onChange, required } = props;

  return (
    <div
      key={ind}
      className={`m-3 justify-content-center align-self-center ${styles.item}`}
    >
      <label required={required} htmlFor={`field_${ind}`}>
        {info.label}
      </label>
      <select
        required={required}
        className="form-select form-control"
        aria-label=".form-select-lg"
        value={value}
        onChange={onChange}
        disabled={info.editable}
      >
        <option>---</option>
        <option value="m">مرد</option>
        <option value="f">زن</option>
      </select>
    </div>
  );
};

InputGenderComponent.propTypes = {
  info: PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    editable: PropTypes.bool,
  }).isRequired,
  ind: PropTypes.number.isRequired,
  value: PropTypes.any,
  onChange: PropTypes.func.isRequired,
};

const InputCityComponent = (props) => {
  const { pref, info, ind, value, onChange, state } = props;

  const cities = useSelector((state) => state.constantDataReducer?.cities);

  useEffect(() => {
    if (info.id === "province" && !value && cities) {
      onChange({
        target: {
          value: cities.filter((city) => city.id === state.city)[0]?.parent,
        },
      });
    }
  }, [cities]);

  return (
    <div
      key={ind}
      className={`m-3 justify-content-center align-self-center ${styles.item}`}
    >
      <label htmlFor={`field_${ind}`}>{info.label}</label>
      <select
        className={`form-select form-control`}
        aria-label=".form-select-lg"
        value={value}
        onChange={onChange}
        disabled={
          info.editable ||
          (info.type === "city"
            ? state.province == null ||
              state.province == undefined ||
              !state.province
            : false)
        }
      >
        <option value={""}>---</option>
        {cities
          ?.filter((i) =>
            info.type === "city" ? i.parent == state.province : i.parent == null
          )
          .map((city) => (
            <option key={`city_option_${city.id}`} value={city.id}>
              {city.fa_name}
            </option>
          ))}
      </select>
    </div>
  );
};

InputCityComponent.propTypes = {
  info: PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    editable: PropTypes.bool,
  }).isRequired,
  ind: PropTypes.number.isRequired,
  value: PropTypes.any,
  onChange: PropTypes.func.isRequired,
  state: PropTypes.any,
};

const InputInsuranceComponent = (props) => {
  const { pref, info, ind, value, onChange } = props;

  return (
    <div
      key={ind}
      className={`m-3 justify-content-center align-self-center ${styles.item}`}
    >
      <label htmlFor={`field_${ind}`}>{info.label}</label>
      <select
        className="form-select form-control"
        aria-label=".form-select-lg"
        value={value}
        onChange={onChange}
        disabled={info.editable}
      >
        <option value={"none"}>هیچ کدام</option>
        <option value={"tamin"}>تامین اجتماعی</option>
        <option value={"salamat"}>سلامت</option>
        <option value={"mosalah"}>نیروهای مسلح</option>
        <option value={"khadamat"}>خدمات درمانی</option>
        <option value={"other"}>متفرقه</option>
      </select>
    </div>
  );
};

InputInsuranceComponent.propTypes = {
  info: PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    editable: PropTypes.bool,
  }).isRequired,
  ind: PropTypes.number.isRequired,
  value: PropTypes.any,
  onChange: PropTypes.func.isRequired,
};

const InputHasInsuranceComponent = (props) => {
  const { pref, info, ind, value, onChange, state } = props;

  useEffect(() => {
    if (state?.supplementary_insurance) {
      onChange({ target: { value: true } });
    } else {
      onChange({ target: { value: false } });
    }
  }, []);

  return (
    <div
      key={ind}
      className={`m-3 justify-content-center align-self-center ${styles.item}`}
    >
      <label htmlFor={`field_${ind}`}>{info.label}</label>
      <select
        className="form-select form-control"
        aria-label=".form-select-lg"
        value={value}
        onChange={onChange}
        disabled={info.editable}
      >
        <option value={false}>خیر</option>
        <option value={true}>بله</option>
      </select>
    </div>
  );
};

InputHasInsuranceComponent.propTypes = {
  info: PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    editable: PropTypes.bool,
  }).isRequired,
  ind: PropTypes.number.isRequired,
  value: PropTypes.any,
  onChange: PropTypes.func.isRequired,
};

const InputSupplementaryInsurance = (props) => {
  const { pref, info, ind, value, onChange, state } = props;

  const supIns = useSelector(
    (state) => state.constantDataReducer?.supplementaryInsuranceList
  );

  return (
    <div
      key={ind}
      className={`m-3 justify-content-center align-self-center ${styles.item}`}
    >
      <label htmlFor={`field_${ind}`}>{info.label}</label>
      <select
        className={`form-select form-control`}
        aria-label=".form-select-lg"
        value={value}
        onChange={onChange}
        disabled={
          info.editable ||
          state?.hasSupIns == "false" ||
          state?.hasSupIns == false
        }
      >
        <option value={null}>---</option>
        {supIns?.map((ins) => (
          <option key={`city_option_${ins.id}`} value={ins.id}>
            {ins.fa_name}
          </option>
        ))}
      </select>
    </div>
  );
};

InputSupplementaryInsurance.propTypes = {
  info: PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    editable: PropTypes.bool,
  }).isRequired,
  ind: PropTypes.number.isRequired,
  value: PropTypes.any,
  onChange: PropTypes.func.isRequired,
  state: PropTypes.any,
};

const FIELDS = [
  {
    id: "national_id",
    label: "کد ملی",
    editable: true,
    component: InputComponent,
  },
  {
    id: "first_name",
    label: "نام",
    required: true,
    editable: false,
    component: (props) => (
      <InputComponent
        {...props}
        value={props.value === "---" ? "" : props.value}
      />
    ),
  },
  {
    id: "last_name",
    label: "نام خانوادگی",
    required: true,
    editable: false,
    component: (props) => (
      <InputComponent
        {...props}
        value={props.value === "---" ? "" : props.value}
      />
    ),
  },
  {
    id: "date_of_birth",
    label: "تاریخ تولد",
    editable: false,
    component: DateComponent,
  },
  {
    id: "gender",
    label: "جنسیت",
    required: true,
    editable: false,
    component: InputGenderComponent,
  },
  {
    id: "province",
    label: "استان",
    type: "province",
    editable: false,
    component: InputCityComponent,
  },
  {
    id: "city",
    label: "شهر",
    type: "city",
    editable: false,
    component: InputCityComponent,
  },
  // {
  //   id: 'has_social_security_insurance',
  //   label: 'بیمه تامین اجتماعی',
  //   editable: false,
  //   component: InputInsuranceComponent,
  // },
  {
    id: "insurance",
    label: "بیمه",
    editable: false,
    component: InputInsuranceComponent,
  },
  {
    id: "hasSupIns",
    label: "بیمه تکمیلی",
    editable: false,
    component: InputHasInsuranceComponent,
  },
  {
    id: "supplementary_insurance",
    label: "بیمه گذار",
    editable: false,
    component: InputSupplementaryInsurance,
  },
];

const PatientInfo = (props) => {
  const router = useRouter();
  const patient = useSelector((state) => state.patientReducer?.patient);
  const user = useSelector((state) => state.authReducer?.me);
  const dispatch = useDispatch();
  const [state, setState] = useState({ ...patient } ?? {});
  const [error, setError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [genderError, setGenderError] = useState(false);
  const isLoading = useSelector(
    (state) => state.patientReducer?.loading === "loading"
  );
  const redErr = useSelector((state) => state.patientReducer?.error);


  const updateState = (key, value) => {
    setState({ ...state, [key]: value, });
  };

  const dispatchLoadCities = async () => {
    try {
      setError(false);
      await dispatch(loadCities()).unwrap();
    } catch (e) {
      setError(true);
    }
  };

  const dispatchLoadInsurance = async () => {
    try {
      setError(false);
      await dispatch(loadSupplementaryInsurance()).unwrap();
    } catch (e) {
      setError(true);
    }
  };

  useEffect(() => {
    dispatchLoadCities();
    dispatchLoadInsurance();
    return () => {};
  }, []);

  console.log("inputPermission :", inputPermission);
  console.log("state :", state);
  console.log("patient :", patient);

  const submit = async () => {
    try {
      setGenderError(false);
      setNameError(false);
      setError(false);

      let validated = FIELDS.filter((item) => item.id !== "gender")
        .map((_) => {
          return (
            _.required && (state[_.id] == "---" || state[_.id].trim() == "")
          );
        })
        .includes(true);
      if (validated) {
        setNameError(true);
        return;
      }
      if (state["gender"] == "---" || state["gender"].trim() == "") {
        setGenderError(true);
        return;
      }
      if (!validated) {
        await dispatch(
          updatePatientInfo({ ...state, patientId: patient.id })
        ).unwrap();
        router.push("/doctors/");
      } else {
        // setNameError(true);
      }
    } catch (e) {
      setError(true);
    }
  };

  return (
    <div className={`row align-items-center ${LoginStyles.bg}`}>
      <div
        className={`d-flex d-md-none justify-content-md-center ${LoginStyles.mainicncnt}`}
      >
        <MainIcon alt="کینیک غدد" className={`${LoginStyles.mainicn}`} />
      </div>
      <div
        className={`d-flex flex-column shadow-lg p-5 mb-5 bg-white rounded align-items-around justify-content-between ${
          LoginStyles.mdl
        } ${isLoading ? "lowopacity" : ""}`}
      >
        <div
          className={`d-flex flex-row flex-wrap p-3 align-self-center justify-content-center justify-content-md-start align-items-center ${styles.itemholder}`}
        >
          {FIELDS.map((_, i) => (
            <_.component
              info={_}
              ind={i}
              key={`field_inp_${_.id}_${i}`}
              value={state[_.id]}
              required={_.required}
            
              onChange={(e) => updateState(_.id, e.target.value)}
              state={
                _.type === "city" ||
                _.type == "province" ||
                _.id === "supplementary_insurance"
                  ? state
                  : null
              }
            />
          ))}
        </div>

        <ErrorComponent error={error} redErr={redErr} />
        {nameError && (
          <ErrorComponent
            error={nameError}
            redErr={"لطفا نام و نام‌خانوادگی خود را وارد کنید."}
          />
        )}
        {genderError && (
          <ErrorComponent
            error={genderError}
            redErr={"لطفا جنسیت خود را وارد کنید"}
          />
        )}
        <div className="d-flex mb-3 flex-row p-3 align-self-center">
          <button
            type="submit"
            className="btn btn-primary flex-fill"
            onClick={submit}
          >
            تکمیل ثبت‌نام
          </button>
        </div>
      </div>
    </div>
  );
};
export default PatientInfo;