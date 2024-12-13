import {Injectable} from '@nestjs/common';
import {InitialChatDto} from "@/chat/dto";
import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';
import {ConfigService} from "@nestjs/config";

const AIROPS_PUBLIC_API = "https://api.airops.com/public_api";

async function sendRequest(options: AxiosRequestConfig): Promise<AxiosResponse> {
  const res = await axios
      .request(options);
  if (res.status === 200 && res.data.result) {
    return res.data.result;
  } else {
    throw new Error(res.statusText);
  }
}

@Injectable()
export class ChatService {
  constructor(private config: ConfigService) {}

  async sendMessage(dto: InitialChatDto) {
    const options = {
      method: 'POST',
      url: `https://api.airops.com/public_api/agent_apps/${this.config.get('AIROPS_AGENT_UUID')}/chat`,
      headers: {Authorization: `Bearer ${this.config.get('AIROPS_API_KEY')}`, accept: 'application/json', 'content-type': 'application/json'},
      data: {
        inputs: {
          current_rating: dto.rating,
          current_focus: dto.focus,
          // ref_session_id: "XXXXYYYYZZZZ"
        }
      }
    } as AxiosRequestConfig;


    if (dto.sessionId) {
      options.data.session_id = dto.sessionId;
    }

    if (dto.message) {
      options.data.message = dto.message;
    }

    try {
      const response = await sendRequest(options);
      console.log("sendMessage --> response ", JSON.stringify(response, null, 2));
      return response;
    } catch (err) {
      console.error("sendMessage --> error ", err);
      return false;
    }
  }

  async receiveTasks(sessionId: string): Promise<any> {
    const options = {
      method: 'POST',
      url: `${AIROPS_PUBLIC_API}/airops_apps/${this.config.get('AIROPS_WORKFLOW_UUID')}/execute`,
      headers: {Authorization: `Bearer ${this.config.get('AIROPS_API_KEY')}`, accept: 'application/json', 'content-type': 'application/json'},
      data: {
        sessionId
      }
    } as AxiosRequestConfig;


    try {
      const response = await sendRequest(options);
      console.log("receiveTasks --> response ", JSON.stringify(response, null, 2));
      return response;
    } catch (err) {
      console.error("receiveTasks --> error ", err);
      return false;
    }
  }
}
