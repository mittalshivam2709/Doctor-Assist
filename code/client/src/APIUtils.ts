import axios, {
  AxiosHeaders,
  AxiosResponse,
  RawAxiosResponseHeaders,Method
} from "axios";
import { GroupItem } from "../Pages/HomePage/@types";
import e from "express";


let auth_token = sessionStorage.getItem("access_token") as string;
let lang = localStorage.getItem("language");
let translateToken = localStorage.getItem("translateID");
let EnglishToEnglish = localStorage.getItem("englishToEnglishID");

export function getLoginResponse(username: string, password: string) {
  return new Promise((resolve, reject) => {
    const params = new URLSearchParams();
    params.append("username", username);
    params.append("password", password);
    fetch("https://app.subtl.ai/api/auth/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params,
    })
      .then((response) => {
        return response.json();
      })
      .then((resp) => {
        resolve(resp);
      });
  });
}

export function getRegisterResponse(
  email: string,
  password: string,
  name: string,
  companyID: string,
  lastName: string
) {
  const payload = {
    email: email,
    password: password,
    first_name: name,
    last_name: lastName,
    company_id: companyID,
    is_active: true,
    is_superuser: false,
    is_verified: false,
    company_admin: false,
    can_upload: true,
  };

  return new Promise((resolve, reject) => {
    var su_email = "super@subtl.ai";
    var su_pwd = "Subtl@1234";
    getLoginResponse(su_email, su_pwd).then((res: any) => {
      if (!res.detail) {
        //success
        let token = res.access_token;
        axios
          .post("https://app.subtl.ai/api/users/register", payload, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((resp) => {
            resolve(resp);
          })
          .catch((rej) => reject(rej));
      }
    });
  });
}

export function getAllCompanies() {
  var su_email = "super@subtl.ai";
  var su_pwd = "Subtl@1234";
  const params = new URLSearchParams();
  params.append("username", su_email);
  params.append("password", su_pwd);
  getLoginResponse(su_email, su_pwd).then((res: any) => {
    if (!res.detail) {
      //success
      // console.log(res);
      let token = res.access_token;
      fetch("https://app.subtl.ai/api/companies/all", {
        headers: { Authorization: "Bearer " + token },
      })
        .then((response) => {
          return response.json();
        })
        .then((resp) => {
          console.log(resp);
        });
    }
  });
}

export function getCompanyRegisterResponse(
  email: string,
  password: string,
  name: string,
  lastName: string,
  companyName: string
) {
  const payload = {
    name: companyName,
    first_name: name,
    last_name: lastName,
    email: email,
    password: password,
    company_admin: true,
    can_upload: true,
    employee_cap: 10,
    domain: "open_domain",
    threshold1: 0,
    threshold2: 0,
  };
  return new Promise((resolve, reject) => {
    axios.post("https://app.subtl.ai/api/companies/register", payload).then(
      (response) => {
        if (response.status == 201) {
          resolve(response);
        } else {
          reject(response);
        }
      },
      (error) => {
        reject(error);
      }
    );
  });
}

export function getUserDetails(token: string) {
  return new Promise((resolve, reject) => {
    axios
      .get("https://app.subtl.ai/api/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((rej) => reject(rej));
  });
}

export function GoogleSSO(token: string) {
  return new Promise((resolve, reject) => {
    const sso_params = new URLSearchParams();
    sso_params.append("token", token);
    axios
      .post("https://app.subtl.ai/api/auth/sso/google", sso_params)
      .then((response) => {
        if (response.status == 200) {
          axios
            .get("https://app.subtl.ai/api/users/me", {
              headers: {
                Authorization: "Bearer " + response.data["access_token"],
              },
            })
            .then((res) => {
              resolve(res);
            });
        }
      });
  });
}

export function getCompanies(access_token: string) {
  return new Promise((resolve, reject) => {
    axios
      .get("https://app.subtl.ai/api/companies", {
        headers: {
          Authorization: "Bearer " + access_token,
        },
      })
      .then((r) => {
        console.log(r.data[0].global_group ,"getCompanies");
        resolve([r.data[0].global_group, r.data[0].id, r.data[0].name]);
      });
  });
}
//acceess
export function sendMessage(
  query: string,
  company_group: string,
  access_token: string
) {
  console.log(
    "query ==>" +
      query +
      "company_group ==>" +
      company_group +
      "access_token ==>" +
      access_token
  );
  return new Promise((resolve, reject) => {
    axios
      .post(
        "https://app.subtl.ai/api/transactions",
        {
          query_string: query,
          target_id: company_group,
        },
        {
          headers: { Authorization: "Bearer " + access_token },
        }
      )
      .then((response) => {
        console.log(response);
        try {
          if (response.status == 201) {
            resolve(response.data.answers);
          }
        } catch (error) {
          console.log("ERROR =-=> " + error);
        }
      });
  });
}

//TEL

//ENG

export function translate(query: any, source: string, target: string) {
  return new Promise((resolve, reject) => {
    console.log("query ==>" + query + "source ==>" + source + "target ==>" + target + "token ==>" + localStorage.getItem("translateID"));
    axios
      .post(
        "https://11fc0468-644c-4cc6-be7d-46b5bffcd914-prod.e1-us-east-azure.choreoapis.dev/aqqz/iiitilmt/1.0.0/onemt",
        {
          text: query,
          source_language: source,
          target_language: target,
        },
        {
          headers: {
            accept: "*/*",
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("translateID"),
          },
        }
      )
      .then((response) => {
        console.log("Response --> " + response.status, response.data);

        if (response.status === 200) {
          resolve(response.data);
        }
      })
      .catch(async (err) => {
        if (err.code === "ERR_BAD_REQUEST") {
          await axios
            .post(
              "https://sts.choreo.dev/oauth2/token",
              new URLSearchParams({
                grant_type: "client_credentials",
              }),
              {
                headers: {
                  Authorization:
                    "Basic X2Z6NlRpd0U3U0VqWXhDeU1idjlGVGVQU29RYTpscXk2RElCbkVqMmwyQU9pVWlIWUp1RnBYQ2dh",
                },
              }
            )
            .then((res) => {
              localStorage.setItem("translateID", res.data.access_token);
            })
            .then(() => {
              // window.location.reload();
            });
        }
      });
  });
}

export async function speechtotexteng(audioUrl: string) {
  console.log("url=====>",audioUrl)
  // return new Promise((resolve, reject) => {
  //   axios
  //     .post(
  //       "https://11fc0468-644c-4cc6-be7d-46b5bffcd914-prod.e1-us-east-azure.choreoapis.dev/aqqz/casr/1.0.0/upload.php",
  //       {
  //         name: "Adithya Raj K",
  //         email: "kadithyaraj@gmail.com",
  //         affiliation: "IITM",
  //         stream: "CS",
  //         url: url,
  //       },
  //       {
  //         headers: {
  //           accept: "*/*",
  //           "Content-Type": "application/json",
  //           "Access-Control-Allow-Origin": "*",
  //           // "x-cors-api-key": "temp_44cfa1dbcf521de1cbbbda4896bf2e94",
  //           //  " Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, POST, DELETE, OPTIONS",
  //           //   "Access-Control-Allow-Headers": "Content-Type",
  //           //   "Access-Control-Max-Age": 86400,
  //           Authorization:
  //             "Bearer " + localStorage.getItem("englishToEnglishID")
  //         },
  //       }
  //     )
  //     .then((response) => {
  //       if (response.status === 200) {
  //         resolve(response.data.recognised_text);
  //       }
  //     })
  //     .catch(async (err) => {

  //     });
  // });
  console.log('inside asr')
  let token = localStorage.getItem('asrToken');
  if (!token||token === 'undefined') {
    try {
      const loginResponse = await axios.post('https://asr.iitm.ac.in/api/accounts/login/', {
        email: 'kabir.shamalani@students.iiit.ac.in',
        password: '12345',
      });
   console.log(loginResponse,"loginResponse");
      if (loginResponse.status === 200) {
        token = loginResponse.data.token;
        localStorage.setItem('asrToken', token);
      } else {
        throw new Error('Failed to get token');
      }
    } catch (error) {
      console.error('Error while getting the token: ', error);
      return { error: 'Failed to get token' };
    }
  }
  console.log('token', token);
 
  const response = await axios.get(audioUrl, { responseType: 'arraybuffer' });
    const fileContent = new Blob([response.data]);

    const formData = new FormData();
    formData.append('file', fileContent, 'online_file.mp4');
    formData.append('vtt', 'true');
    formData.append('language', 'english');

    const url = 'https://asr.iitm.ac.in/api/asr/';

    const headers = {
      Authorization: `Token ${token}`,
      // 'Content-Type': 'multipart/form-data',
    };

    console.log(formData,"formdata");
    try {
      const axiosConfig = {
        method: 'POST' as Method,
        url,
        headers,
        data: formData,
      };
      const response = await axios(axiosConfig);
      return new Promise((resolve, reject) => {
      console.log("<====",response.data.transcript);
      resolve(response.data.transcript);
    });
    } catch (error) {
      console.error(error);
    }
}
export async function speechtotexttel(audioUrl: string) {
    console.log("url=====>",audioUrl)
    console.log('inside asr')
  let token = localStorage.getItem('asrToken');
  if (!token||token === 'undefined') {
    try {
      const loginResponse = await axios.post('https://asr.iitm.ac.in/api/accounts/login/', {
        email: 'kabir.shamalani@students.iiit.ac.in',
        password: '12345',
      });
   console.log(loginResponse,"loginResponse");
      if (loginResponse.status === 200) {
        token = loginResponse.data.token;
        localStorage.setItem('asrToken', token);
      } else {
        throw new Error('Failed to get token');
      }
    } catch (error) {
      console.error('Error while getting the token: ', error);
      return { error: 'Failed to get token' };
    }
  }
  console.log('token', token);
 
    const response = await axios.get(audioUrl, { responseType: 'arraybuffer' });
    const fileContent = new Blob([response.data]);
    const formData = new FormData();
    formData.append('file', fileContent, 'online_file.mp4');
    formData.append('vtt', 'true');
    formData.append('language', 'telugu');

    const url = 'https://asr.iitm.ac.in/api/asr/';
    const headers = {
      Authorization: `Token ${token}`,
      // 'Content-Type': 'multipart/form-data',
    };
    console.log(formData,"formdata");
    try {
      const axiosConfig = {
        method: 'POST' as Method,
        url,
        headers,
        data: formData,
      };
      const response = await axios(axiosConfig);
      return new Promise((resolve, reject) => {
      console.log("<====",response.data.transcript);
      resolve(response.data.transcript,'telugu response');
    });
    } catch (error) {
      console.error(error);
    }
}

export function getMeiliRecommendations(query: string, company_id: string) {
  return new Promise((resolve, reject) => {
    const payload = {
      q: query,
      filter: "company_id = " + company_id,
    };
    axios
      .post(
        "https://app.subtl.ai/meili" + "/indexes/transactions/search",
        payload,
        {
          headers: {
            "X-Meili-API-Key":
              "2915d2cbaa7472f3f7acdf6429354e6b4e1e2fd3a5a67f16260bb97196f87086",
          },
        }
      )
      .then((response) => {
        //console.log(response.data)

        let returns = response.data.hits.slice(0, 4);
        resolve(returns);
      });
  });
}

export function getPDF(id: string, auth_token: string) {
  return new Promise(
    (
      resolve: (value: {
        url: string;
        highlight: number;
        resp: RawAxiosResponseHeaders;
      }) => void,
      reject
    ) => {
      axios
        .get(
          "https://app.subtl.ai/api/transactions/answers/" +
          id +
          "/highlighted_file",
          {
            headers: {
              Authorization: "Bearer " + auth_token,
              "Access-Control-Allow-Origin": "*",
            },
            responseType: "arraybuffer",
          }
        )
        .then((response) => {
          // console.log(response);
          let pageURL = URL.createObjectURL(
            new Blob([response.data], {
              type: "application/pdf",
            })
          );
          // console.log(pageURL)
          resolve({
            url: pageURL,
            highlight: response.headers.highlights,
            resp: response.headers,
          });
        })
        .catch((err) => {
          reject(err);
        });
    }
  );
}

export function getPage(page: number, docID: string) {
  let auth_token = sessionStorage.getItem("access_token") as string;
  return new Promise(
    (
      resolve: (val: {
        url: string;
        highlight: number;
        headers: RawAxiosResponseHeaders;
      }) => void,
      reject
    ) => {
      axios
        .get(
          "https://app.subtl.ai/api/documents/file/" +
          docID +
          "?page=" +
          page.toString(),
          {
            headers: {
              Authorization: "Bearer " + auth_token,
            },
            responseType: "arraybuffer",
          }
        )
        .then((res) => {
          let pageURL = URL.createObjectURL(
            new Blob([res.data], {
              type: "application/pdf",
            })
          );
          resolve({
            url: pageURL,
            highlight: res.headers.highlights,
            headers: res.headers,
          });
        });
    }
  );
}

export function UploadDocument(
  auth_token: string,
  file: File,
  upload_group: string,
  doc_creation_date: string
) {
  let formData = new FormData();
  formData.append("file", file);
  formData.append("group_id", upload_group);
  formData.append("creation_date", doc_creation_date);
  return new Promise((resolve, reject) => {
    axios
      .post("https://app.subtl.ai/api/documents", formData, {
        headers: {
          Authorization: "Bearer " + auth_token,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response.status);
        if (response.status == 201) {
          //success
          console.log(response);
          ProcessDocument(upload_group, auth_token);
          resolve("success");
        }
      })
      // .catch((err) => {
      //   console.log(err.response.status);
      //   if (err.response.status == 422) {
      //     alert("Sorry, can't process scanned document");
      //   } else {
      //     alert("error while uploading");
      //   }
      // });
      .catch((err) => {
        console.log(err.response);
        if (err.response) {
          // Server responded with an error
          reject(err.response.data); // You can return the server's error message
        } else if (err.request) {
          // The request was made but no response was received
          console.error(err.request);
          reject("No response from server"); // You can handle this case accordingly
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error('Error', err.message);
          reject("Request setup error"); // You can handle this case accordingly
        }
      });
  });
}

export function ProcessDocument(groupID: string, auth_token: string) {
  axios
    .post(
      "https://app.subtl.ai/api/groups/process/" + groupID,
      {},
      { headers: { Authorization: "Bearer " + auth_token } }
    )
    .then((res) => {
      console.log(res.status);
    });
}

export function UploadVideo(
  VTT_file: File,
  Video_file: File,
  videogroupID: string,
  doc_creation_date: string,
  auth_token: string
) {
  let formData = new FormData();
  formData.append("file", VTT_file);
  formData.append("video", Video_file);
  formData.append("group_id", videogroupID);
  formData.append("creation_date", doc_creation_date);
  return new Promise((resolve, reject) => {
    axios
      .post("https://app.subtl.ai/api/documents/video", formData, {
        headers: {
          Authorization: "Bearer " + auth_token,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          resolve("success");
        } else {
          reject("err");
        }
      })
      .catch(() => {
        reject("err");
      });
  });
}

export function AddYoutubeVideo(
  url: string,
  auth_token: string,
  groupid: string,
  customTitle: string
) {
  return new Promise((resolve, reject) => {
    const payload = {
      url: url,
      name: customTitle,
      group_id: groupid,
      metadata: "",
      Timestamp: String(Date.now()),
    };
    // Upload youtube link
    axios
      .post("https://app.subtl.ai/api/documents/youtubeVideo", payload, {
        headers: { Authorization: "Bearer " + auth_token },
      })
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          resolve(res);
        } else {
          reject("err");
        }
      })
      .catch((err) => {
        reject("err");
      });
  });
}

export function AddWebsite(
  url: string,
  auth_token: string,
  groupid: string,
  customTitle: string
) {
  return new Promise((resolve, reject) => {
    const params = new URLSearchParams();
    params.append("filename", customTitle);
    params.append("url", url);
    params.append("group_id", groupid);
    params.append("creation_date", String(Date.now()));
    // Upload youtube link
    axios
      .post("https://app.subtl.ai/api/documents/website", params, {
        headers: { Authorization: "Bearer " + auth_token },
      })
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          resolve(res);
        } else {
          reject("err");
        }
      })
      .catch((err) => {
        reject("err");
      });
  });
}

export function getGroupsList(token: string,comapnyID:string) {
  console.log(token, "token663");
  return new Promise((resolve, reject) => {
    axios
      .get("https://app.subtl.ai/api/groups?company_id="+comapnyID, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((rej) => console.log(rej));
  });
}

export function getGroupData(group_id: string) {

  let auth_token = sessionStorage.getItem("access_token") as string;
  return new Promise((resolve: (val: GroupItem[]) => void, reject) => {
    axios
      .get("https://app.subtl.ai/api/groups/" + group_id + "/docs", {
        headers: { Authorization: "Bearer " + auth_token },
      })
      .then((response) => {
        resolve(response.data);
      });
  });
}

export function Logout() {
  let auth_token = sessionStorage.getItem("access_token") as string;
  return new Promise((resolve, reject) => {
    axios
      .post(
        "https://app.subtl.ai/api/auth/logout",
        {},
        {
          headers: {
            Authorization: "Bearer " + auth_token,
            accept: "application/json",
          },
        }
      )
      .then(
        (response) => {
          if (response.status == 200) {
            resolve(true);
          }
        },
        (error) => {
          reject(true);
        }
      );
  });
}


export async function texttospeech(msg: string, lang: string) {
  console.log("Inside TTS",msg, lang);
  console.log('inside asr')
  let token = localStorage.getItem('asrToken');
  if (!token||token === 'undefined') {
    try {
      const loginResponse = await axios.post('https://asr.iitm.ac.in/api/accounts/login/', {
        email: 'kabir.shamalani@students.iiit.ac.in',
        password: '12345',
      });
   console.log(loginResponse,"loginResponse");
      if (loginResponse.status === 200) {
        token = loginResponse.data.token;
        localStorage.setItem('asrToken', token);
      } else {
        throw new Error('Failed to get token');
      }
    } catch (error) {
      console.error('Error while getting the token: ', error);
      return { error: 'Failed to get token' };
    }
  }
  console.log('token', token);

  const payload = {
    input: msg,
    lang: lang,
    gender: 'male',
    alpha: 1,
    segmentwise: 'True',
    fullaudio: 'True'
  };

  const headersList = {
    Authorization: `Token ${token}`,
    'Content-Type': 'application/json'
  };
  return new Promise((resolve, reject) => {
    axios
      .get(
        "https://asr.iitm.ac.in/ttsv2/tts",
        payload,
        {
          headers: headersList
        }
      )
      .then((response) => {
        // console.log("Response --> " + response.status, response.data);
        // console.log(response);
        // if (response.status === 200) {
        //   let song = new Audio(response.data.outspeech_filepath[0]);
        //   resolve(song);
        // }
        console.log(response);
        // Play the audio
        // const audio = new Audio(response);
        // audio.play();
      })
      .catch(async (err) => {
        console.log(err, "Error");
      });
  });
}

//https://11fc0468-644c-4cc6-be7d-46b5bffcd914-prod.e1-us-east-azure.choreoapis.dev/aqqz/iltts/1.0.0/IITM_TTS/API/tts.php

function base64ArrayBuffer(arrayBuffer: any) {

  let binary = '';
  const bytes = new Uint8Array(arrayBuffer);
  const len = bytes.length;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

export function f1(audioUrl: string, lang: string) {
  console.log("kjadsnjcjsndjkcsndcjn", audioUrl, lang);
  const url = 'https://asr.iitm.ac.in/asr/v2/decode';
  // const audioUrl = 'https://bahubhashak-iiit.s3.us-east-2.amazonaws.com/ts/me_at_thevoice_mp3.mp3';
  // console.log( base64ArrayBuffer(response.data));
  axios.get(audioUrl, { responseType: 'arraybuffer' })
    .then(async response => {
      const fileContent = base64ArrayBuffer(response.data);
      const payload = {
        vtt: 'true',
        language: lang,
      };

      const files = [
        {
          file: {
            name: 'online_file.mp3',
            content: fileContent,
            content_type: 'application/octet-stream',
          },
        },
      ];

      const headers = {};
      // console.log(fileContent);
      try {
        return await new Promise((resolve, reject) => {
          axios.post(url, { payload, files }, { headers })
            .then((response_1) => console.log(response_1.data))
            .catch(error => console.error(error));
        });
      } catch (error_1) {
        return console.error(error_1);
      }
    });
}

export async function convertTextToSpeech(text: string,lang: string)
{
  if(localStorage.getItem("audioState") === "true")
  {
    return;
  }
  console.log("Inside TTS",text, lang);
    try {
      const response = await fetch('https://backendchat.iiithcanvas.com/api/tts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          // 'Access-Control-Allow-Methods': '*',
          // 'Access-Control-Allow-Headers': '*',
          
        },
        body: JSON.stringify({ input: text, language: lang }),
      });

      const data = await response.json();
      const audioData = data.audio_base64; // Audio in base64 format
      // console.log(audioData);
      // Create an audio element
      const audio = new Audio(`data:audio/mpeg;base64,${audioData}`);
      
      // Play the audio
    
     localStorage.setItem("audioState","true");
       audio.play();
    //  localStorage.setItem("audioState","false");
    audio.addEventListener('ended', () => {
      localStorage.setItem('audioState', 'false');
    });
      
    } catch (error) {
      console.error('Error:', error);
    }

}