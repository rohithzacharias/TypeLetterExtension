from transformers import DistilBertTokenizerFast, DistilBertForSequenceClassification, Trainer, TrainingArguments
from datasets import load_dataset

# Load model
model_name = "distilbert-base-uncased"
tokenizer = DistilBertTokenizerFast.from_pretrained(model_name)
model = DistilBertForSequenceClassification.from_pretrained(model_name, num_labels=2) # 0 = Informal, 1 = Formal

# Example dataset
# {"text": "Write a leave letter to my teacher", "label": 1}
dataset = load_dataset("json", data_files={"train": "formality.json", "test": "formality.json"})

def preprocess(examples):
    return tokenizer(examples["text"], truncation=True, padding="max_length")

tokenized_dataset = dataset.map(preprocess, batched=True)

args = TrainingArguments(
    output_dir="./classifier_results",
    evaluation_strategy="epoch",
    learning_rate=2e-5,
    per_device_train_batch_size=8,
    num_train_epochs=3,
)

trainer = Trainer(
    model=model,
    args=args,
    train_dataset=tokenized_dataset["train"],
    eval_dataset=tokenized_dataset["test"],
    tokenizer=tokenizer,
)

trainer.train()
model.save_pretrained("./saved_models/distilbert-formality")
tokenizer.save_pretrained("./saved_models/distilbert-formality")