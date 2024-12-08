from django import forms
from .models import Message

class MessageForm(forms.ModelForm):
    class Meta:
        model = Message
        fields = ['sender', 'receiver', 'content']  # Include sender, receiver, and content fields in the form

    # Customize form behavior and appearance
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['sender'].widget.attrs['readonly'] = True  # Make the sender field read-only
        self.fields['content'].widget.attrs['placeholder'] = 'Type your message here...'  # Add a placeholder for content
        self.fields['content'].widget.attrs['class'] = 'message-content'  # Optionally add a custom CSS class
