export const judgeCriticality = (data) => {
    const {
      critical_case,
      body_temperature,
      spo2,
      pulse_rate,
      blood_pressure_sys,
      blood_pressure_dys,
    } = data;
  
    let criticality = '';
  
    if (critical_case === 'yes') {
      criticality = 'Critical';
    } else {
      let count_critical = 0;
      let count_moderate = 0;
      let count_minor = 0;
  
      // For body temperature
      if (body_temperature >= 105 || body_temperature <= 95) {
        count_critical++;
      } else if (body_temperature >= 103 && body_temperature < 105) {
        count_moderate++;
      } else if (body_temperature < 103) {
        count_minor++;
      }
  
      // For Spo2
      if (spo2 < 85) {
        count_critical++;
      } else if (spo2 >= 85 && spo2 <= 90) {
        count_moderate++;
      } else if (spo2 > 90) {
        count_minor++;
      }
  
      // For Heart rate
      if (pulse_rate >= 130 || pulse_rate <= 40) {
        count_critical++;
      } else if (pulse_rate >= 110 && pulse_rate <= 60) {
        count_moderate++;
      } else if (pulse_rate < 110 && pulse_rate > 60) {
        count_minor++;
      }
  
      // For Systolic blood pressure
      if (blood_pressure_sys >= 180 || blood_pressure_sys <= 90) {
        count_critical++;
      } else if (blood_pressure_sys > 90 && blood_pressure_sys <= 160) {
        count_minor++;
      } else if (blood_pressure_sys < 180 && blood_pressure_sys > 160) {
        count_moderate++;
      }
  
      // for diastolic pressure
      if (blood_pressure_dys >= 120 || blood_pressure_dys <= 80) {
        count_critical++;
      } else if (blood_pressure_dys >= 90 && blood_pressure_dys <= 120) {
        count_moderate++;
      } else if (blood_pressure_dys < 90 && blood_pressure_dys > 80) {
        count_minor++;
      }
  
      if (count_critical >= 3) {
        criticality = 'Critical';
      } else if (count_critical === 2 && count_moderate >= 2) {
        criticality = 'Moderate';
      } else if (count_moderate > 0) {
        criticality = 'Moderate';
      } else {
        criticality = 'Minor';
      }
    }
  
    return criticality;
  };
  