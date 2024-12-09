import {Injectable} from '@nestjs/common';
import {InitialChatDto} from "@/chat/dto";
import axios, {AxiosRequestConfig} from 'axios';
import {ConfigService} from "@nestjs/config";

@Injectable()
export class ChatService {
  constructor(private config: ConfigService) {}

  async startInitialChat(dto: InitialChatDto) {
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
      const res = await axios
          .request(options);

      console.log("createChatInstance --> res.data ", res.data)
      if (res.status === 200 && res.data.result) {
        return res.data.result;
      } else {
        throw new Error(res.statusText);
      }
    } catch (err) {
      console.error("createChatInstance --> error ", err);
      return false;
    }
  }
}
