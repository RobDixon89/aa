import type { Meta, StoryFn } from "@storybook/react";
import { Default as UspStories } from "../../components/UspList/UspList.stories";
import RichText, { type RichTextProps } from "./RichText";

const meta: Meta<RichTextProps> = {
  component: RichText,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

const Template: StoryFn<RichTextProps> = (args: RichTextProps) => (
  <RichText {...args} />
);

export const Default = Template.bind({});
Default.args = {
  id: "rt-675t872yg78322",
  title: "Proin ut urna sit amet mauris",
  content: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam lectus tortor, pulvinar eu ullamcorper sed, consectetur non turpis. Maecenas in <a href="#">nunc pulvinar</a>, rutrum mi sit amet, dignissim nibh. Vestibulum lobortis eros et massa fermentum, non volutpat ipsum mollis. Pellentesque faucibus sed diam nec placerat. Nunc convallis, lectus at ultrices finibus, velit dui euismod ligula, sed condimentum lectus metus a nisl.</p>

  <ul>
    <li>Duis ut sollicitudin mi.</li>
    <li>Suspendisse ut accumsan elit, ut eleifend nibh.</li>
    <li>Ut nibh nisl, rutrum in dignissim vitae, pretium a magna.</li>
    <li>Vivamus eget orci felis.</li>
    <li>Morbi et finibus elit.</li>
    <li>Vivamus sagittis eu ligula a mollis.</li>
  </ul>
   
  <p>Praesent pharetra magna nibh, eget hendrerit lorem ullamcorper et. Etiam odio purus, ultricies id varius in, posuere eleifend dolor. Aliquam in turpis eu nulla faucibus vestibulum. Praesent commodo ex nec rutrum dignissim. Ut imperdiet vitae diam et efficitur. Nulla facilisi. Etiam non elit urna. Interdum et malesuada fames ac ante ipsum primis in faucibus. Ut at dapibus eros, in posuere lectus.</p>

  <ol>
    <li>Nullam gravida non dolor non consectetur.</li>
    <li>Nunc pulvinar vitae ante non tempus. </li>
    <li>In sed justo nunc. </li>
    <li>Orci varius natoque penatibus.</li>
    <li>Ut pellentesque pretium nisl, at venenatis ex ultrices vitae.</li>
  </ol>`,
};

export const KitchenSink = Template.bind({});
KitchenSink.args = {
  content: `<h2>Header Level 2</h2>

				<p><strong>Pellentesque habitant morbi tristique</strong> senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. <em>Aenean ultricies mi vitae est.</em> Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. <a href="#">Donec non enim</a> in turpis pulvinar facilisis. Ut felis.</p>
        
        <p class="subtitle">Small Text</p>
        <p class="jhhkjgj small">Consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Donec eleifend, libero at sagittis mollis, tellus est malesuada tellus, at luctus turpis elit sit amet quam. Vivamus pretium ornare est.</p>

        <p class="subtitle">Large Text</p>
        <p class="jhhkjgj large">Consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Donec eleifend, libero at sagittis mollis, tellus est malesuada tellus, at luctus turpis elit sit amet quam. Vivamus pretium ornare est.</p>
        
        
				<h3>Header Level 3</h3>

				<ol>
				   <li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li>
				   <li>Aliquam tincidunt mauris eu risus.</li>
				</ol>

				<h4>Header Level 4</h4>

				<ul>
				   <li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li>
				   <li>Aliquam tincidunt mauris eu risus.</li>
				</ul>

				<blockquote><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus magna. Cras in mi at felis aliquet congue. Ut a est eget ligula molestie gravida. Curabitur massa. Donec eleifend, libero at sagittis mollis, tellus est malesuada tellus, at luctus turpis elit sit amet quam. Vivamus pretium ornare est.</p></blockquote>`,
};

export const WithCtas = Template.bind({});
WithCtas.args = {
  ...Default.args,
  ctas: [
    {
      text: "Button Text",
      url: "#",
    },
    {
      text: "Button Text",
      url: "#",
    },
  ],
};

export const WithUsps = Template.bind({});
WithUsps.args = {
  ...WithCtas.args,
  uspList: UspStories.args?.items ? UspStories.args?.items : undefined,
};

export const Central = Template.bind({});
Central.args = {
  ...WithUsps.args,
  content: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam lectus tortor, pulvinar eu ullamcorper sed, consectetur non turpis. Maecenas in nunc pulvinar.</p>`,
  alignment: "center",
};

export const LocationList = Template.bind({});
LocationList.args = {
  id: "kldDWIOWAPOWNO",
  title: "Areas we cover",
  content: `<ul>
    <li><a href="#">Location Name</a></li>
    <li><a href="#">Location Name</a></li>
    <li><a href="#">Location Name</a></li>
    <li><a href="#">Location Name</a></li>
    <li><a href="#">Location Name Longer</a></li>
    <li><a href="#">Location Name</a></li>
    <li><a href="#">Location Name</a></li>
    <li><a href="#">Location Name</a></li>
    <li><a href="#">Location Name</a></li>
    <li><a href="#">Location Name</a></li>
    <li><a href="#">Location Name Longer</a></li>
    <li><a href="#">Location Name</a></li>
    <li><a href="#">Location Name</a></li>
    <li><a href="#">Location Name</a></li>
    <li><a href="#">Location Name</a></li>
    <li><a href="#">Location Name</a></li>
    <li><a href="#">Location Name</a></li>
    <li><a href="#">Location Name</a></li>
    <li><a href="#">Location Name</a></li>
    <li><a href="#">Location Name</a></li>
    <li><a href="#">Location Name Longer</a></li>
    <li><a href="#">Location Name</a></li>
    <li><a href="#">Location Name</a></li>
  </ul>`,
  alignment: "center",
  columns: true,
};
