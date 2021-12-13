import { Controller, Get, Post, Param, Body, NotFoundException } from '@nestjs/common';
import { CreateMessageDto } from './dtos/create-message.dto';
import { MessagesService } from './messages.service';

@Controller('/messages')
export class MessagesController {

    constructor(public messagesService: MessagesService) {}

    // Get Methods
    @Get()
    getMessages() {
        return this.messagesService.findAll();
    };

    // Post Methods
    @Post()
    createMessage( @Body() body: CreateMessageDto ){
        this.messagesService.create(body.content);
    };

    @Get('/:id')
    async getMessage(@Param('id') id: any){
        const message = await this.messagesService.findOne(id);

        if (!message) {
            throw new NotFoundException("Message not found :c");
        }

        return message;
    }
}
