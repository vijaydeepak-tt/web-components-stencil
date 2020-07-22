import { Component, h, Prop, State, Method } from "@stencil/core";

@Component({
  tag: "uc-side-drawer",
  styleUrl: "side-drawer.css",
  shadow: true,
})
export class SideDrawer {
  @State() showContactInfo = false;

  @Prop({ reflectToAttr: true }) heading: string;
  @Prop({ reflectToAttr: true, mutable: true }) opened: boolean;

  onCloseDrawer = () => {
    this.opened = false;
  };

  onContentChange(content: string) {
    this.showContactInfo = content === "contact";
  }

  @Method()
  async open() {
    this.opened = true;
  }

  render() {
    let mainContent = <slot />;
    if (this.showContactInfo) {
      mainContent = (
        <div id="contact-information">
          <h2>Contact Information</h2>
          <p>You can reach as via phone or email.</p>
          <ul>
            <li>Phone: 47586938490</li>
            <li>
              <a href="mailto:something@something.com">
                something@something.com
              </a>
            </li>
          </ul>
        </div>
      );
    }

    return [
      <div class="backdrop" onClick={this.onCloseDrawer} />,
      <aside>
        <header>
          <h1>{this.heading}</h1>
          <button onClick={this.onCloseDrawer}>X</button>
        </header>
        <section id="tabs">
          <button
            class={this.showContactInfo ? "" : "active"}
            onClick={this.onContentChange.bind(this, "nav")}
          >
            Navigation
          </button>
          <button
            class={!this.showContactInfo ? "" : "active"}
            onClick={this.onContentChange.bind(this, "contact")}
          >
            Contact
          </button>
        </section>
        <main>{mainContent}</main>
      </aside>,
    ];
  }
}
