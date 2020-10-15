<template>
    <v-stepper class="elevation-0" v-model="e1" alt-labels>
        <v-stepper-header>
            <v-stepper-step editable step="1">Welcome!</v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step editable step="2">Setup Tracker</v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step editable step="3">Add Cameras</v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step editable step="4">License</v-stepper-step>
            <v-divider></v-divider>
            <!--
            <v-stepper-step editable step="4">Add Storage</v-stepper-step>
            <v-divider></v-divider>
            -->
            <v-stepper-step editable step="5">Finished!</v-stepper-step>
        </v-stepper-header>
        <v-stepper-items>
    
            <!-- Welcome -->
            <v-stepper-content step="1">
                <v-card>
                    <v-card-text class="text-center">
                        <v-col offset="3" align="center" justify="center" cols="6">
                            <v-row justify="center" align="center">
                                <div class="display-2">Welcome</div>
                            </v-row>
                            <v-row justify="center" align="center">
                                <v-col align="center" justify="center" cols="6">
                                    <v-img width="350" src="../assets/skyhub_logo.png"></v-img>
                                </v-col>
                            </v-row>
                            <v-col class="mt-5">
                                We will now help you configure your Sky Hub Tracker device.
                                <!--<p class="title">Your Tracker's unique identifier is {{config.uuid}}</p>-->
                            </v-col>
                        </v-col>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn class="ma-5" dark color="primary" @click="next()">Next</v-btn>
                    </v-card-actions>
                </v-card>
            </v-stepper-content>
    
            <!-- General Configuration -->
            <v-stepper-content step="2">
                <v-card flat>
                    <v-card-title>
                        Let's configure the general settings for your device.
                    </v-card-title>
                    <v-card-text>

                        <v-form>
                            <v-row>
                                <v-col cols="6">
                                    <v-subheader>Your tracker name for Sky Hub</v-subheader>
                                    <v-text-field v-model="config.nodename" outlined label="Tracker Name"></v-text-field>
                                    <!--
                                    <v-subheader>Set hostname for your node.</v-subheader>
                                    <v-text-field readonly v-model="config.uuid" outlined label="Traker ID"></v-text-field>
                                    -->
                                    <v-subheader>Set your email address.</v-subheader>
                                    <v-text-field v-model="config.username" outlined label="Email Address"></v-text-field>
                                </v-col>
                                <v-col cols="6">
                                    <v-subheader>Set password for your tracker.</v-subheader>
                                    <v-text-field type="password" v-model="config.password" outlined label="Password"></v-text-field>
                                    <v-subheader>Type your password again.</v-subheader>
                                    <v-text-field type="password" v-model="config.passwordagain" outlined label="Password Again"></v-text-field>
                                    <v-alert border="top" color="red" dark v-show="config.password != config.passwordagain">Passwords do not match.</v-alert>
                                    <v-alert border="top" color="red" dark v-show="config.password == ''">Password is required to proceed.</v-alert>
                                    <v-alert border="top" color="green" dark v-show="config.password != '' && config.password == config.passwordagain">Password is valid.</v-alert>
                                </v-col>
                            </v-row>
                        </v-form>
    
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn class="ma-5" dark color="primary" @click="prev()">Back</v-btn>
                        <v-btn class="ma-5" dark color="primary" :disabled="config.password == '' || config.password != config.passwordagain" @click="next()">Next</v-btn>
                    </v-card-actions>
                </v-card>
            </v-stepper-content>
    
            <!-- Camera Configuration -->
            <v-stepper-content step="3">
                <v-card flat>
                    <v-card-title>
                        Configure your cameras.
                    </v-card-title>
                    <v-card-text>
                        <v-col cols="12">
                            <v-form v-for="(i,v) in config.cameraList" :key="v" row="1">
                                <v-row row="1">
                                    <v-col cols="4">
                                        <v-text-field v-model="config.cameraList[v].name" outlined label="Name"></v-text-field>
                                    </v-col>
                                    <v-col cols="5">
                                        <v-text-field v-model="config.cameraList[v].uri" outlined label="URI" placeholder="Example: rtsp://ipaddress:port"></v-text-field>
                                    </v-col>
                                    <v-col cols="3">
                                        <v-text-field v-model="config.cameraList[v].location" outlined label="Location"></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="3">
                                        <v-text-field v-model="config.cameraList[v].username" outlined label="Username"></v-text-field>
                                    </v-col>
                                    <v-col cols="3">
                                        <v-text-field v-model="config.cameraList[v].password" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :type="show1 ? 'text' : 'password'" name="input-10-1" hint="At least 8 characters" counter @click:append="show1 = !show1" outlined label="Password"></v-text-field>
                                    </v-col>
                                    <v-col cols="3">
                                            <v-select v-model="config.cameraList[v].type" :items="cameraTypes" label="Standard"></v-select>
                                    </v-col>
                                    <v-col cols="2">
                                        <v-checkbox v-model="config.cameraList[v].enabled" @click="setCameraEnabled(v)" outlined :label="`Enabled: ${config.cameraList[v].enabled.toString()}`"></v-checkbox>
                                    </v-col>
                                    <v-col cols="1">
                                        <v-btn class="ma-5" color="error" @click="delCameraRow(v)">Remove</v-btn>
                                    </v-col>
                                </v-row>
                                <v-divider class="ma-5"></v-divider>
                            </v-form>
                        </v-col>
                    </v-card-text>
                    <v-card-actions fixed bottom>
                        <v-spacer></v-spacer>
                        <v-btn class="ma-5" color="" @click="addCameraRow()">Add Camera</v-btn>
                        <v-btn class="ma-5" dark color="primary" @click="prev()">Back</v-btn>
                        <v-btn class="ma-5" dark color="primary" @click="next()">Next</v-btn>
                    </v-card-actions>
                </v-card>
            </v-stepper-content>
    
            <!-- Storage Configuration -->
            <!--
            <v-stepper-content step="4">
                <v-card flat>
                    <v-card-title>
                        Setup storage devices that will be used to store video and sensor data.
                    </v-card-title>
                    <v-card-text>
                        <v-col cols="12">
                            <v-form>
                                <v-row v-for="(i,v) in storage" :key="v" row="1">
                                    <v-col justify="start" align="center" cols="1">
                                        <v-btn v-if="v && storage.length > 0" @click="delStorageRow(v)" icon>
                                            <v-icon large>mdi-delete</v-icon>
                                        </v-btn>
                                    </v-col>
                                    <v-col cols="4">
                                        <v-subheader>Enter the name for disk. e.g. Storage_1 </v-subheader>
                                        <v-text-field v-model="config.storage[v].name" outlined label="Name"></v-text-field>
                                    </v-col>
                                    <v-col cols="4">
                                        <v-subheader>Enter the path to mounted disk. e.g. /mnt/storage</v-subheader>
                                        <v-text-field v-model="config.storage[v].location" outlined label="Location"></v-text-field>
                                    </v-col>
                                    <v-col justify="end" align="center" cols="1">
                                        <v-btn v-if="v == storage.length -1" @click="addStorageRow" icon>
                                            <v-icon large>mdi-plus</v-icon>
                                        </v-btn>
                                    </v-col>
                                </v-row>
                            </v-form>
                        </v-col>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn class="ma-5" dark color="primary" @click="prev()">Back</v-btn>
                        <v-btn class="ma-5" dark color="primary" @click="next()">Next</v-btn>
                    </v-card-actions>
                </v-card>
            </v-stepper-content>
            -->
    
     <v-stepper-content step="4">
                <v-card>
                    <v-card-title >
                        <v-col offset="3" align="center" justify="center" cols="6">
                        <h3>Sky Hub Terms of Service</h3>
                        </v-col>
                    </v-card-title>
                    <v-card-text class="text-center">
                        <v-col offset="1" align="center" justify="center" cols="10">
                            <v-col class="mt-5 eluabox">
                                <p>
                                Unfortunately, the world we live in demands us to get your agreement to our Terms of Service. If you want to participate in this Project, please agree to the following:
                                This website is owned and operated by Sky Hub Inc and its subsidiaries (collectively “Sky Hub,” “we,” “us,” or “our”). These Terms of Service (“Terms”) govern your legal rights to use or access our project, software, and our websites (the “Project”). Please read these Terms carefully before taking part in the Project. By using or accessing our Project, you signify your acknowledgement and assent to the terms and conditions of use set forth below. These Terms (together with other user agreements, where applicable) constitute a binding legal agreement between you and Sky Hub (this “Agreement”). 
                                *If you do not agree with these Terms, please do not take part in our Project. *
                                </p>
                                <h3>GENERAL</h3>
                                <p>
                                This Agreement represents the entire understanding relating to your taking part in this Project and prevails over any prior or contemporaneous, conflicting or additional communications between you and Sky Hub. All rights not expressly granted herein are reserved by Sky Hub. However, to the extent your participation in the Project involves or is integrated with products or project of third party companies, any terms and policies covering those products or project may also apply.
                                The term “you,” as used in these Terms, includes any person or entity who is taking part in this Project and creates a user account with Sky Hub (“Participant”), as well as any person or entity allowed or authorized to access or use the Participant’s Project (“Authorized Users”). Authorized Users are responsible for their own actions in connection with the Project, but Participant hereby consents to these terms on behalf of all Authorized Users and agrees to be fully responsible for all actions taken by Authorized Users relating to the Participant’s involvement in the Project and Participant’s account. As a result, if you are a Participant, you should authorize only those individuals that you trust to access your account and take part in the Project.
                                You must be at least 13 years old to take part in the Project. If you are between the ages of 13 and 18, you may take part in the Project only with the consent and under the supervision of a parent or legal guardian who agrees to be bound by these Terms. If you are a parent or legal guardian of a user between the ages of 13 and 18, you consent to these terms on behalf of such user and you are fully responsible for the acts of such user in relation to our Project.
                                If you’re agreeing to these Terms on behalf of an organization or entity, you represent and warrant that you are authorized to agree to these Terms on that organization or entity’s behalf and bind them to these Terms (in which case, the references to “you” and “your” in these Terms, except for in this sentence, refer collectively to you personally and to that organization or entity).
                                </p>
                                <h3>CHANGES TO THIS AGREEMENT AND PROJECT</h3>
                                <p>
                                Sky Hub is free to revise these Terms or any other part of this Agreement at any time by updating this page. If we make changes to these Terms that we consider material, we will make reasonable efforts to notify you by placing a notice on the Sky Hub.com website, notifying you through the Project, by sending you an email, or by some other means. By continuing to use our Products and Project after such changes, you are expressing your acknowledgement and acceptance of the changes. Please check these Terms periodically for updates.
                                We’re always trying to improve the Project, so they may change over time. We may suspend or discontinue any part of the Project, or we may introduce new features or impose limits on certain features or restrict access to parts or all of the Project. Similarly, we reserve the right to remove any Data from the Project at any time, for any reason, in our sole discretion, and without notice.
                                We are also free to terminate (or suspend access to) your use of the Project or your account, for any reason in our discretion, including your breach of these Terms. We have the sole right to decide whether you are in violation of any of the restrictions set forth in this Agreement.
                                </p>
                                <h3>ACCESS AND USE</h3>
                                <p>
                                Sky Hub grants you non-exclusive right to access and make non-commercial use of the Project and the data gathered through the Project under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License which can be read in detail here: https://creativecommons.org/licenses/by-nc-sa/4.0/legalcode.
                                Privacy and other laws applicable in your jurisdiction may impose certain responsibilities on you and your participation in the Project. You agree that it is your responsibility, and not the responsibility of Sky Hub, to ensure that you comply with any applicable laws when you participate in the Project, including but not limited to any laws or regulations relating to the recording or sharing of video or audio data, (2) any laws or regulations requiring that notice be given to or that consent be obtained from third parties with respect to your participation in the Project (for example, laws or regulations requiring you to display appropriate signage advising others that audio/visual recording is taking place), and/or (3) any laws or regulations requiring (a) that installation of any Tracker which takes visual and/or audio recordings be installed at such an angle that it does not take any recordings beyond the boundary of your property (including public pavements or roads); and (b) that, if you use your property as a workplace, you comply with laws governing the monitoring of employees.
                                If your participation in the Project is prohibited by applicable laws, then you aren’t authorized to take part in the Project. We can’t and won’t be responsible for your participation in the Project in a way that breaks the law.
                                When you join the Project you will sign up for a Tracker account and select a user name and password (“User ID”). You may not select as your User ID a name that you don’t have the right to use, or another person’s name with the intent to impersonate that person. Also, you will not share your account or password with anyone, and you must protect the security of your account and your password. You’re responsible for any activity associated with your account.
                                You represent, warrant, and agree that you will not capture or contribute any Data (as defined below) or otherwise use the Project in a manner that:
                                </p>
                                <ul>
                                    <li>Infringes or violates the intellectual property rights or any other rights of anyone else;</li>
                                    <li>Violates any law, ordinance, or regulation, including privacy and other laws referenced above and any applicable export control laws;</li>
                                    <li>Is harmful, fraudulent, deceptive, threatening, harassing, defamatory, obscene, or otherwise objectionable;</li>
                                    <li>Jeopardizes the security of your Sky Hub account or anyone else’s;</li>
                                    <li>Attempts, in any manner, to obtain the password, account, or other security information from any other user;</li>
                                    <li>Violates the security of any computer network, or cracks any passwords or security encryption codes;</li>
                                    <li>interferes with the proper working of the Project (including by placing an unreasonable load on the Project’ infrastructure);</li>
                                    <li>“Crawls,” “scrapes,” or “spiders” any page, data, or portion of or relating to the Project or Data (through use of manual or automated means);</li>
                                    <li>Copies or stores any significant portion of the Data; or</li>
                                    <li>Violates the Sky Hub Community guidelines, which are hereby incorporated by reference.</li>
                                </ul>
                                <p>
                                A violation of any of the foregoing is grounds for termination of your right to use or access the Project.
                                </p>
                                <h3>DATA COLLECTING TRACKER</h3>
                                <p>
                                Your Tracker collects data. If you are installing a Tracker at a property owned, operated or managed by a third party or where other individuals live, work or are otherwise present (collectively, “Other Parties”), you represent and warrant to us that you have notified those Other Parties, to the extent required by law, and obtained all approvals, permissions, consents and authorizations, if and as required from such Other Parties, for installation and operation of the Tracker at the installation location.
                                You further represent and warrant to us that the installation of the Tracker at that location will not violate a third party’s proprietary and privacy rights or otherwise violate any applicable law or disrupt or negatively affect any other systems, or other infrastructure or property.
                                </p>
                                <h3>DATA</h3>
                                <p>
                                You are solely responsible for all of your Data (including Data you share through the Sky Hub application). “Data” means all audio, video, images, data, or other types of data captured by your Tracker or provided to us (including data posted by you) in connection with the Project. You represent and warrant that: (a) you own the intellectual property rights in Data posted by you or otherwise have the right to post the Data and grant the license set forth below, and (b) the posting and use of your Data on or through the Project does not violate the privacy rights, publicity rights, copyrights, contract rights, intellectual property rights or any other rights of any person.
                                You hereby grant Sky Hub and its licensees an unlimited, irrevocable, fee free and royalty-free, perpetual, worldwide right to use, distribute, store, delete, translate, copy, modify, display, and create derivative works from such Data that you share through our Project including, without limitation, the Sky Hub Tracker feature or application, for any purpose and in any media format. You shall not use, reproduce, modify, upload, publish, transmit, distribute, display, or otherwise exploit for any purposes whatsoever any Data: (i) not owned by you without the express prior written consent of the respective participants, and (ii) in any way that violates any third party right. Sky Hub reserves the right, but shall not be obligated, to remove any Data from the Project at any time in its sole and absolute discretion. You agree that you will indemnify Sky Hub for all claims and resulting from Data you share through our Project, including, without limitation, the Sky Hub Tracker feature. If you see Data that you believe violates our Terms, please report it to us by emailing abuse@Sky Hub.org.
                                </p>
                                <h3>RECORDINGS, DATA, AND PERMISSION FROM YOU</h3>
                                <p>
                                Sky Hub does not claim ownership of your intellectual property rights in your Data. Other than the rights you grant to us under these Terms, you retain all rights you have in your Data.
                                However, by using your Tracker and participating in the Project, you give Sky Hub the right, without any compensation or obligation to you, to access and use your Data for the any and all purposes related to the Project, and as otherwise set forth in our Privacy Notice.
                                Additionally, by participating in the Project you are electing to publicly share your Data via our Project to other users, researchers or the general public, and, in addition to the license granted above, you give Sky Hub the right, without any compensation or obligation to you, to access and use your Data and related location information for the purposes of publicly sharing such recordings and information with current and future users, researchers, and the general public, and allowing them to build data sets with the Data for publication under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License for public use.
                                </p>
                                <h3>RISK OF LOSS</h3>
                                <p>
                                All purchases of physical items from third parties for use in your Sky Hub Tracker are made at your own risk. Sky Hub does not assume any risk of loss or damage for or from any items or the failure of any components you use for building your Tracker. You agree that Sky Hub is not responsible for any damage caused by any components of the Tracker.
                                </p>
                                <h3>SOFTWARE UPDATES</h3>
                                <p>
                                From time to time, Sky Hub may develop updates, upgrades, patches and other modifications to improve the performance of the Project and/or the Trackers or for other reasons in our sole discretion (“Updates”). You agree that Sky Hub may automatically install such Updates without providing any additional notice to you or receiving any additional consent from you.
                                </p>
                                <h3>USER COMMUNICATIONS</h3>
                                <p>
                                Sky Hub is a community project and everything we do begins with you and the rest of the community. We always accept creative ideas, suggestions or other materials related to the Project. You agree that anything you propose or suggest to us by or through our website, chat or the Project (“communications”), including e-mails to Sky Hub or postings on the interactive chat linked to our website, shall be deemed and shall remain free to use under an unlimited license from you to the Project. If you send us such communications, you do so on a NON-CONFIDENTIAL BASIS, and we will have no obligation to keep such information secret, to refrain from using such information, or to compensate you for the receipt or use of such communications. Sky Hub is free to use, for any purpose whatsoever, any communications, including but not limited to publishing, developing, manufacturing, and marketing our Project using such communications. By submitting communications to us through our websites, via e-mail, or by any means, you hereby RELEASE Sky Hub from any liability under any legal theory in connection with the use, modification, sale, or disclosure of any such communications. By uploading or otherwise providing any communications to our websites or to Sky Hub, you hereby grant Sky Hub, to the extent you retain any rights, the unlimited, perpetual right to reuse, redistribute, modify, and create derivative works from such communications for any purpose and in any media without compensation to you.
                                </p>
                                <h3>OPEN SOURCE SOFTWARE</h3>
                                <p>
                                Permission is hereby granted, free of charge, to any person obtaining a copy of the Sky Hub software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
                                The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
                                </p>
                                <h3>NO REPRESENTATIONS OR WARRANTIES</h3>
                                <p>
                                THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
                                NOR DO WE IN ANY WAY GUARANTEE THE QUALITY, OR LEGALITY OF INFORMATION OR DATA, THAT ARE TRANSFERRED, RECEIVED, OR OTHERWISE MADE AVAILABLE OR OBTAINED BY WAY OF THIS WEBSITE OR THE PROJECT. WE DO NOT WARRANT THAT OUR PROJECT WILL BE UNINTERRUPTED, OR ERROR-FREE, OR THAT DEFECTS WILL BE CORRECTED. APPLICABLE LAW MAY NOT ALLOW THE EXCLUSION OF IMPLIED WARRANTIES, SO THE ABOVE EXCLUSION MAY NOT APPLY TO YOU.
                                </p>
                                <h3>EXCLUSION OF LIABILITY</h3>
                                <p>
                                UNDER NO CIRCUMSTANCES, INCLUDING NEGLIGENCE, SHALL SKY HUB BE LIABLE FOR ANY SPECIAL, INCIDENTAL, OR CONSEQUENTIAL DAMAGES OR LOST PROFITS THAT RESULT FROM THE DISTRIBUTION OR USE OF, OR THE INABILITY TO USE, THE DATA OR MATERIALS ON THE SKY HUB WEBSITE, OR THE PROJECT, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. APPLICABLE LAW MAY NOT ALLOW THE LIMITATION OR EXCLUSION OF LIABILITY OR INCIDENTAL OR CONSEQUENTIAL DAMAGES, SO THE ABOVE LIMITATION MAY NOT APPLY TO YOU.
                                </p>
                                <h3>MALWARE VULNERABILITY NOTICE AND WAIVER</h3>
                                <p>
                                Equipment that relies on wireless or internet connections or are connected to a network of any kind (such as communications equipment, cameras, wireless radios, access control, cloud storage, NAS storage, and other kinds of networkable devices) may not be secure and may be exploited or hacked by malware and spyware variants (“Malware Vulnerabilities”). Malware Vulnerabilities may provide a gateway for a person with malicious intent the capability to view, extract, change, destroy, steal, disclose or alter your data, or the data of others; monitor and/or spy on your activities and the activities of others; cause internet and network outages; provide for unintended or unauthorized access by others to your network, or the network of others; and otherwise place people, property or data at risk. SKY HUB MAKES NO WARRANTY OR REPRESENTATION THAT THE SKY HUB PROJECT NETWORK IS SECURE, DOES NOT HAVE, OR IS NOT SUSCEPTIBLE TO, MALWARE VULNERABILITIES. Sky Hub assumes no liability whatsoever for any Malware Vulnerabilities and, to the fullest extent permitted by applicable law, you agree to release and hold Sky Hub harmless from any Malware Vulnerabilities and any related loss or damage of any kind or sort, even if caused by any breach of contract or negligence of any kind or degree of Sky Hub (the “Malware Vulnerability Release”). If the Malware Vulnerability Release is not enforceable under applicable law for any reason, then the LIMITATION OF SKY HUB’S LIABILITY herein shall apply to any losses or damages, of any kind or sort, arising from, or related to, Malware Vulnerabilities.
                                </p>
                                <h3>LIMITATIONS OF LIABILITY</h3>
                                <p>
                                TO THE EXTENT PERMITTED BY APPLICABLE LAW, UNDER NO CIRCUMSTANCES WILL SKY HUB BE LIABLE IN ANY WAY FOR ANY DATA, INCLUDING, BUT NOT LIMITED TO, ANY ERRORS OR OMISSIONS IN ANY DATA, OR ANY LOSS OR DAMAGE OF ANY KIND INCURRED IN CONNECTION WITH USE OF OR EXPOSURE TO ANY DATA POSTED, EMAILED, ACCESSED, TRANSMITTED, OR OTHERWISE MADE AVAILABLE VIA THE PROJECT.
                                YOU PARTICIPATE IN THE PROJECT AT YOUR OWN RISK. YOU HAVE SOLE RESPONSIBILITY FOR ADEQUATE PROTECTION AND BACKUP OF DATA AND/OR EQUIPMENT USED IN CONNECTION WITH YOUR PARTICIPATION IN THE PROJECT, AND YOU AGREE TO HOLD SKY HUB HARMLESS FROM, AND YOU COVENANT NOT TO SUE US FOR, ANY CLAIMS BASED ON YOUR USE OF THE TRACKER OR YOUR PARTICIPATION IN THE PROJECT, INCLUDING CLAIMS FOR LOST DATA OR EQUIPMENT, WORK DELAYS OR LOST PROFITS RESULTING FROM YOUR USE OF THE TRACKER OR PROJECT.
                                IF ANY PORTION OF THIS SECTION IS HELD TO BE INVALID UNDER THE LAWS OF YOUR JURISDICTION, THE INVALIDITY OF SUCH PORTION SHALL NOT AFFECT THE VALIDITY OF THE REMAINING PORTIONS OF THE APPLICABLE SECTIONS.
                                </p>
                                <h3>JURISDICTION AND CHOICE OF LAW</h3>
                                <p>
                                Sky Hub manages the Project from its facilities in the State of Texas in the United States of America. Information published by or within the Project may contain references to programs and services that are not announced or available in your country or region. We make no representation that such information, services, programs or project referenced by or within the Project are legal, available or appropriate in your country or region.
                                These Terms shall be governed by and construed in accordance with the laws of the State of Texas and the United States of America, without giving effect to any principles of conflicts of law.
                                </p>
                                <h3>SEVERABILITY AND SURVIVAL</h3>
                                <p>
                                If any provision of these Terms shall be deemed unlawful, void, or for any reason unenforceable, then that provision shall be deemed severable from the remaining terms of use and shall not affect the validity and enforceability of any remaining provisions.
                                Provisions that, by their nature, should survive termination of these Terms shall survive termination. 
                                </p>
                                <h3>PRIVACY</h3>
                                <p>
                                Please see our Privacy Notice for information regarding the collection and use of personal information collected through our Project.
                                </p>
                                <h3>QUESTIONS OR CONCERNS</h3>
                                <p>
                                Questions concerning these Terms, should be directed to Team@Sky Hub.org.
                                </p>

                            </v-col>
                        </v-col>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn class="ma-5" dark color="primary" @click="prev()">Back</v-btn>
                        <v-btn class="ma-5" dark color="primary" @click="next()">Accept &amp; Continue</v-btn>
                    </v-card-actions>
                </v-card>
            </v-stepper-content>


            <!-- Finished -->
            <v-stepper-content step="5">
                <v-card>
                    <v-card-text class="text-center">
                        <v-col offset="3" align="center" justify="center" cols="6">
                            <v-row justify="center" align="center">
                                <div class="display-2">Setup Complete</div>
                            </v-row>
                            <v-col class="mt-5">
                                <p>Click done to save your setting and start using your tracker.</p>
                            </v-col>
                        </v-col>
                        <v-row justify="center" v-if="saving" align="center">
                            <v-progress-circular size="100" indeterminate></v-progress-circular>
                        </v-row>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn class="ma-5" dark color="primary" @click="prev()">Back</v-btn>
                        <v-btn class="ma-5" dark color="primary" @click="saveConfig()">Done</v-btn>
                        <v-spacer></v-spacer>
                    </v-card-actions>
                </v-card>
            </v-stepper-content>
        </v-stepper-items>
    </v-stepper>
</template>
<style>
.eluabox {
    overflow: auto;
    height: 350px;
    width:100%;
    border: solid #ddd 1px;
    border-radius: 4px;
}
</style>
<script>
export default {
    name: 'FirstConfigWizard',
    data() {
        return {
            saving: false,
            show1: false,
            config: {
                uuid: "",
                username: "",
                password: "",
                passwordagain: "",
                hostname: "",
                nodename: "",
                cameraList: [
                    { name: "", location: "", uri: "", username: "", password: "", type:"PTX", enabled: true },
                ],
                storageList: [
                    { name: "", location: "" },
                ],
            },
            cameras: [1],
            storage: [1],
            step:1,
            e1: 1,
            cameraTypes: ['PTZ', 'Fisheye'],
        }
    },
    computed: {
        ConfigResp() {
            return this.$store.state.controller.GetConfigResp;
        }
    },
    watch: {
        ConfigResp: function() {
            this.updateConfigFromResponse();
        }
    },
    mounted() {
        if(this.$store.state.controller.GetConfigResp.config) {
            this.updateConfigFromResponse();
        } else {
            this.$store.dispatch('controller/GetConfig');
        }
    },
    methods: {
        next() {
            console.log(this.step);
            this.e1++;
        },
        prev() {
            this.e1--;
        },
        updateConfigFromResponse() {
            var config =  this.$store.state.controller.GetConfigResp.config
            if(this.$data.config.cameraList.length === 0) {
                this.$data.config.cameraList.push({ name: "", location: "", uri: "", username: "", password: "", type:"PTX", enabled: true });
            }
            this.$data.config.nodename = config.nodename;
            this.$data.config.uuid = config.uuid;
            this.$data.config.username = config.username;
            this.$data.config.hostname = config.hostname;

        },
        saveConfig() {
            var self = this;
            this.config.configured = true;
            this.saving = true;

            this.$store.dispatch('controller/SetConfig', this.config).then(function() {
                self.saving = false;
                setTimeout(function() {
                    self.$store.dispatch('controller/GetConfig');
                    self.$store.dispatch('controller/AutoLogin');
                }, 2000);
            })
        },
        addCameraRow() {
            this.config.cameraList.push({ name: "", location: "", uri: "", username: "", password: "", type:"PTX", enabled: false })
            //this.config.cameraList.push(0)
        },
        setCameraEnabled(id) {
            for(var i = 0; i < this.config.cameraList.length; i++) {
                var camera = this.config.cameraList[i];
                if(id == i) {
                    camera.enabled = true;
                } else {
                    camera.enabled = false;
                }
            }
        },
        delCameraRow(i) {
            if(this.config.cameraList[i].enabled) {
                if(i > 0) this.config.cameraList[i - 1].enabled = true;
                if(i == 0 && this.config.cameraList.length > 0) this.config.cameraList[i + 1].enabled = true;
            }
            this.config.cameraList.splice(i, 1);
            this.$forceUpdate();
        },
        addStorageRow() {
            this.config.storageList.push({ name: "", location: "" });
            this.config.storageList.push(0);
        },
        delStorageRow(i) {
            this.config.storageList.splice(i, 1);
            this.config.storageList.splice(i, 1);
        },
    }
}
</script>
